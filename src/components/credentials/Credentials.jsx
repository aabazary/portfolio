import "./credentials.css";

const credentialsImages = [
    "/credentials/AWS.png",
    "/credentials/Itil4.png",
    "/credentials/ProjectPlus.png",
    "/credentials/WGUFE.png",
    "/credentials/WGUBE.png",
  ];
const Credentials = () => {
    return (
      <div className="certificates-container">
        <div className="certificates-badges">
          {credentialsImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Badge ${index + 1}`}
              className="certificate-badge"
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default Credentials;