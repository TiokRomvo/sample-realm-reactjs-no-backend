import {useEffect, useState} from "react";
import * as apiCaller from "./apiCaller";

const ShareVideos = () => {
  const videosLink = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-jzhmn/endpoint/getDocuments?collectionName=youTubeVideos';
  const videosAddLink = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-jzhmn/endpoint/addADocument?collectionName=youTubeVideos';
  const usersAddLink = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-jzhmn/endpoint/addADocument?collectionName=users';
  const usersLink = 'https://us-east-1.aws.data.mongodb-api.com/app/application-0-jzhmn/endpoint/getDocuments?collectionName=users';
  const [videos, setVideos] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState();
  const getVideos = () => {
    apiCaller.request(videosLink, 'GET').then(res => {
      const {data} = res;
      setVideos(data);
    })
  }
  useEffect(() => {
    getVideos();
  }, [])
  const share = () => {
    const data = {
      "email": email,
      "youtubeUrl": shareUrl
    }
    apiCaller.request(videosAddLink, "POST", data).then(res => {
      setIsSharing(false);
      getVideos();
    })
  }
  const register = () => {
    const data = {
      "email": email,
      "password": password
    }
    apiCaller.request(usersAddLink, "POST", data).then(res => {
      setIsLogin(true);
    })
  }
  const login = () => {
    apiCaller.request(usersLink.concat("&queryParams=email=").concat(email).concat("*").concat("password=").concat(password), "GET").then(res => {
      const {data} = res;
      if(data.length > 0) {
        setIsLogin(true);
      } else {
        register();
      }
    })
  }
  return <div className="App">
    <h1>Funny Movies</h1>
    <div>
    {!isLogin ?
    <>
      <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="email"></input>
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password"></input>
      <button onClick={() => login()}>Login / Register</button>
      </>
      : 
      <>
      <button onClick={() => setIsSharing(true)}>Share A Video</button>
      <button onClick={() => 
      {
        setEmail();
        setPassword();
        setIsLogin(false)
      }}>Logout</button>
      </>
    }
    </div>
    {isSharing ?
    <>
    <input type="text" onChange={(e) => setShareUrl(e.target.value)} label="Youtube URL"></input>
    <button onClick={() => {share()}}>Share</button>
    </>
    :
    <div style={{display: 'block'}}>
        {videos.map(c => 
          <div>
            <div>Shared by: {c.email}</div>
            <iframe width="560" height="315" src={c.youtubeUrl.replace("watch?v=", "embed/")}
            title="YouTube video player" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>
          </div>
        )
      }
    </div>
    }
  </div>
};
export default ShareVideos;
