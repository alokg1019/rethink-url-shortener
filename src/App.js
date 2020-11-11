import React, {useState} from 'react';
import './App.css';
import { Card, Button, Container, Grid, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createShortUrl, findLongUrlFromShortUrl} from "./service/urlservice";
import Alert from '@material-ui/lab/Alert';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

function App() {

  const [values, setValues] = useState({ longUrl: '', domain: '', shortUrl : '', shortenedUrl : ''});
  const [shortUrl, setShortUrl] = useState("");
  const [textCopied, setTextCopied] = useState(false);
  const [urlData, setUrlData] = useState({});

  const [alert, setAlert] = useState({
     status : "",
     show : false,
     message : "",
     messageFor : ""
  });

  // Generate short URL from the Long URL
  const generateShortUrl = (e) => {
      if(values.longUrl.length > 0 && values.domain.length > 0)
      {
        createShortUrl(values, setShortUrl, setAlertMessage);
      }
      else
      {
        setAlertMessage('error', 'Please fill in both the fields', true, "url_shortener");
      }
  }

  //Retreive LongURL from Short URL
  const findLongUrl = (e) => {
    if(values.shortenedUrl.length > 0)
    {
      findLongUrlFromShortUrl(values.shortenedUrl, setUrlData, setAlertMessage);
    }
    else
    {
      setAlertMessage('error', 'Please fill in shortened URL', true, "url_finder");
    }
  }

  // Set alert messages
  const setAlertMessage = (status, message, show, messageFor) => {
     setAlert({
       status : status,
       message : message,
       show : show,
       messageFor : messageFor
    });
  }

  //Update state from input fields
  const handleInputChange = (e) => {
     setValues({...values, [e.target.name]: e.target.value});
     setAlertMessage('', '', false, "");
  }

  // Copy to clipboard
  const copyUrl = () => {

      if(alert.messageFor == "url_shortener")
      {
        navigator.clipboard.writeText(shortUrl);
      }
      else
      {
        navigator.clipboard.writeText(urlData.long_url);
      }
      
      setTextCopied(true);
      setTimeout(() => {
        setTextCopied(false);
      }, 1800);
  }

  // rendering alert message
  const displayMessage = () => {
        
        if(alert.show)
        {

          var variant = alert.status == "success" ? "success" : "error";
          var copy_icon = ( 
                            <Button style={{ margin: '10px'}}
                               onClick={copyUrl}
                            >
                              <FileCopyOutlinedIcon></FileCopyOutlinedIcon>
                              { textCopied ? <b style={
                                { color: 'darkgreen', 
                                  textTransform: 'capitalize',
                                  marginLeft : '5px'
                                }}>Copied</b> : ''}
                            </Button>
                          );

          return (
            <Card>
              <Alert severity={variant}>{ alert.message }
              { variant == 'success' ? copy_icon : null}
                </Alert>
            </Card>
        )
      }

      return null;
  }

  return (
    <div className="App">
      <Container
      justify='center'
      style={{ margin: 'auto', justify: 'center', marginTop:'100px'}}>
        <Card>
        <Grid>
          <Typography variant="h3" component="h2" gutterBottom>
            URL Shortener
          </Typography>
        </Grid>
        <Grid style={{ margin: '20px'}}>
          <TextField fullWidth name="longUrl" id="url_input" label="Original URL" value={values.longUrl} onChange={handleInputChange} ></TextField>
        </Grid>
        <Grid style={{ margin: '20px'}}>
          <TextField fullWidth name="domain" id="url_domain" label="Short URL Domain" value={values.domain} onChange={handleInputChange}></TextField>
        </Grid>
        <Grid style={{ margin: '20px'}}>
          <Button variant="contained" color="primary" onClick={generateShortUrl}>Shorten URL</Button>
        </Grid>
        </Card>
        { alert.messageFor == "url_shortener" ? displayMessage() : null }


        <Card style={{ marginTop: '30px', boxShadow: '10px'}}>
        <Grid>
          <Typography variant="h3" component="h2" gutterBottom>
            Find Long URL
          </Typography>
        </Grid>
        <Grid style={{ margin: '20px'}}>
          <TextField fullWidth name="shortenedUrl" label="Shortened URL" value={values.shortenedUrl} onChange={handleInputChange} ></TextField>
        </Grid>
        <Grid>

        </Grid>
        <Grid style={{ margin: '20px'}}>
          <Button variant="contained" color="primary" onClick={findLongUrl}>Find Original URL</Button>
        </Grid>
        </Card>
        { alert.messageFor == "url_finder" ? displayMessage() : null }

      </Container>
    </div>
  );
}

export default App;
