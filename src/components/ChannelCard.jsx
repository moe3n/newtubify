import { Box, CardContent, CardMedia, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';

const ChannelCard = ({channelDetail,marginTop} ) => (
  <Box 
    sx={{ boxShadow: 'none',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: { xs:'356px', md:'320px'},
    height:'326px',
    margin: 'auto',
    marginTop: marginTop,
  }}
  >
    <Link to={`/channel/${channelDetail?.id?.channelId}`}>
      <CardContent 
      sx={{ 
        display:'flex', 
        flexDirection:'column', 
        textAlign:'center', 
        justifyContent:'center',
        color: 'white', }}
      >
        <CardMedia
        image={channelDetail?.snippet?.thumbnails?.medium?.url || demoProfilePicture}
        sx={{ width: '180px', height: '180px', borderRadius: '50%', mb:2, border: '1px solid #e3e3e3' }}
        />
        <Typography variant="h6">
          {channelDetail?.snippet?.title}<CheckCircle sx={{ fontSize:14, color:'gray', ml:'5px'}}/>
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography variant="subtitle2">
              {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()} Subscribers
            </Typography>
          )}

      </CardContent>
    </Link>


  </Box>
);

export default ChannelCard