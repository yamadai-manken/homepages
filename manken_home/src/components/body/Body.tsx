// import BodyImage from './BodyImage'
import BodyVideo from '../../components/body/BodyVideo';
import '../../global.css'


export default function Body() {
  return (
    <div className="stage">
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',      // これが超重要
        overflow: 'hidden',
        background: '#fff',
      }}>
    {/* <BodyImage /> */}
    {/* <DrawingCanvas /> */}
    {/* <BodyVideo /> */}
    <BodyVideo
    revealMs={1400}
    startAt="center"
    customPos={{ x: 35, y: 60 }}
    scale={1.3}                 // 1.8倍に拡大
    zoomAt="top"              // 右側を基準にズーム
    // zoomAt="custom"
    // zoomPos={{ x: 30, y: 70 }} // 任意の%でズーム基準指定も可能
    />
    </div>
    </div>
  );
}
