import  body_img  from '../../assets/to_loveru_ankuru.png'

function BodyImage() {
  return (
    <div className="container-fluid p-0">
      <img src={body_img} alt="ロゴ画像" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
}

export default BodyImage
