import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [isExpanded, setExpanded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);

  if(!videoDetail?.snippet) return 'Loading...'//<Loader />;

  const { snippet: { title, channelId, channelTitle, description }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "column" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px", background: "#191a19" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={3} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography sx={{ fontFamily:'Roboto' }} variant={{ sm: "body1", md: "h6" }} color="#fff">
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              
              <Stack direction="row" gap="20px" alignItems="center">
                 <Typography variant="body1" sx={{ opacity: 0.7 }}>
                   {parseInt(viewCount).toLocaleString()} views
                 </Typography>
                 <Typography variant="body1" sx={{ opacity: 0.7 }}>
                   {parseInt(likeCount).toLocaleString()} likes
                 </Typography>
               </Stack>
             </Stack>
           </Box>
           
         </Box>
        
       </Stack>
       <Box sx={{fontFamily:'Verdana', background: "#191a19", lineHeight:'1.4rem'}} p={2}>
        <Typography  variant={{ sm: "body1", md: "h6" }} color="#fff">
                {isExpanded ? description : description.slice(0, 140) + "..."}
                <br />
                <br />
                <span style={{ cursor: "pointer", color: "blue" }} onClick={() => setExpanded(!isExpanded)}>
                  {isExpanded ? "See Less" : "See More"}
                </span>
        </Typography>
        </Box>
       
       <Box px={2} py={{  xs: 5, md: 2 }} justifyContent="center" alignItems="center" >
           <Videos videos={videos} direction="row" />
       </Box>
     </Box>
   );
 };

export default VideoDetail;