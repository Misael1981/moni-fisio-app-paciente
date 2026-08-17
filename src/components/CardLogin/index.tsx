import Image from "next/image"
import styles from "./CardLogin.module.css"

type CardLoginProps = {
  title: string
  subtitle: string
  children: React.ReactNode
}

const CardLogin = ({ title, subtitle, children }: CardLoginProps) => {
  return (
    <section>
      <div className={styles.stage}>
        <div className={`${styles.orb} ${styles.one}`} />
        <div className={`${styles.orb} ${styles.two}`} />
        <div className={`${styles.orb} ${styles.three}`} />

        <div className={styles.panel}>
          <div className={styles.card}>
            <div className={styles.brand}>
              <Image
                src="/logo.svg"
                alt="Moni Fisioterapia"
                width={50}
                height={50}
              />
              <span className={styles.eyebrow}>Letícia Moni Fisioterapia</span>
            </div>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.sub}>{subtitle}</p>

            {children}
          </div>
          <div className={styles.footer}>
            Precisa de ajuda? <a href="#">Fale com o time de infraestrutura</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardLogin
