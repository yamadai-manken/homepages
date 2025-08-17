import PageNavi from '../ui/PageNavi'
import styles from './Footer.module.css'
import '../../global.css'

export default function Footer() {
  return (
    <footer className="footer" >
      <div className={styles.footerNav} >
        <PageNavi
          onPrev={() => console.log('前へ')}
          onMenu={() => console.log('メニュー')}
          onNext={() => console.log('次へ')}
        />
      </div>
    </footer>
  );
}

