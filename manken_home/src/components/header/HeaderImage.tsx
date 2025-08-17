import  head_img  from '../../assets/edo-heater-noword-mirror.png'


function HeaderImage() {
  return (
      <div className="container-fluid p-0">
        <img src={head_img} alt="ロゴ画像" style={{ width: '100%', height: 'auto' }} />
      </div>
  );
}

export default HeaderImage
