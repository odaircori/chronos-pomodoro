import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

export function Menu() {
  type AvailableTheme = "dark" | "light";

  const [theme, setTheme] = useState<AvailableTheme>("dark");

  function handleThemeChange(event: React.MouseEvent) {
    event.preventDefault();

    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";

      return nextTheme;
    });
  }

  useEffect(() => {
    console.log("USeEffect rodando");

    document.documentElement.setAttribute("data-theme", theme);

    //este return é executado pelo useEffect antes mesmo de executar a ação dele. Serve para executar limpezas na página, como remover listerners, antes do componente ser atualizado
    return () => {
        console.log('Este componente será atualizado');
    }
  }, [theme]);

  return (
    <div className={styles.menu}>
      <h1>{theme}</h1>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Ir para Home"
        title="Ir para Home"
      >
        <HouseIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Histórico"
        title="Histórico"
      >
        <HistoryIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Mudar Tema"
        title="Mudar Tema"
        onClick={handleThemeChange}
      >
        <SunIcon />
      </a>
    </div>
  );
}
