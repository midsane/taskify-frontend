export default function ImagePfp(userData) {
  const imageSrc = userData.pfp;
  let pfpcontent;
  if (!imageSrc || imageSrc == "") {
    pfpcontent =
      userData.username.toUpperCase()[0] || userData.email.toUpperCase()[0];
  } else {
    pfpcontent = <img className="scale-125" src={imageSrc} />;
  }
  return pfpcontent;
}
