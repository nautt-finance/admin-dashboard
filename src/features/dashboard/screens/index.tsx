import { useTranslations } from "next-intl";

const DashboardScreen: React.FC = () => {
  const t = useTranslations("DashboardPage");

  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  );
};

export { DashboardScreen };
