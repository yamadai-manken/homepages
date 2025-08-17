import styles from './StickyUI.module.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function StickyUI() {
  return (
    <>
    <div className={styles.header}>
      <div>
        <h3 className={styles.jpTitle}>松に鶴</h3>
        <h2 className={styles.jpReading}>まつにつる</h2>
        <h1 className={styles.enTitle}>MATSU NI TSURU</h1>

      </div>

       <nav className="">
      <div className="container-fluid">

        {/* ハンバーガーアイコン */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ナビゲーションリンク */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">ホーム</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">活動</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">作品</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">SNS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">コンタクト</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
      
    </div>

    </>
  );
}

export default StickyUI
