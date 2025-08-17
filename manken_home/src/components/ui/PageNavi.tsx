import styles from './PageNavi.module.css'
import MenuIcon from '../../assets/ui/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react'
import ArrowLeftIcon from '../../assets/ui/arrow_forward_ios_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react'
import ArrowRightIcon from '../../assets/ui/arrow_back_ios_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react'
import SliderIcon from '../../assets/ui/tune_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react'
// import ComicModeIcon from '../../assets/ui/toggle_on_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg?react'

type PageNaviProps = {
  onPrev?: () => void
  onMenu?: () => void
  onSlider?: () => void
  // onComic?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
  iconSize?: number
  iconColor?: string
  iconHoverColor?: string
}

export default function PageNavi({
  onPrev,
  onMenu,
  onSlider,
  // onComic,
  onNext,
  hasPrev,
  hasNext,
  iconSize = 24,
  iconColor = '#FFFFFF',
  iconHoverColor = '#1e90ff',
}: PageNaviProps) {
  return (
    <nav
      className={styles.nav}
      style={{
        // CSS変数にpropsの色をセット
        ['--icon-normal-color' as any]: iconColor,
        ['--icon-hover-color' as any]: iconHoverColor,
      }}
    >
      <button onClick={onPrev} disabled={!hasNext} className={styles.button}>
        <ArrowRightIcon width={iconSize} height={iconSize} />
        <span>次の話</span>
      </button>

      <button onClick={onMenu} className={styles.button}>
        <MenuIcon width={iconSize} height={iconSize} />
        <span>メニュー</span>
      </button>

      <button onClick={onSlider} className={styles.button}>
        <SliderIcon width={iconSize} height={iconSize} />
        <span>スライダー</span>
      </button>

      {/* <button onClick={onComic} className={styles.button}>
        <ComicModeIcon width={iconSize} height={iconSize} />
        <span> ComicMode </span>
      </button> */}

      <button onClick={onNext} disabled={!hasPrev} className={styles.button}>
        <ArrowLeftIcon width={iconSize} height={iconSize} />
        <span>前の話</span>
      </button>
    </nav>
  )
}

