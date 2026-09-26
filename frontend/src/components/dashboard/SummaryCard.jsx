import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SummaryCard = ({
  title,
  amount,
  icon: Icon,
  type = "default",
}) => {
  const styles = {
    income: {
      card: "border-green-200 bg-green-50/70",
      iconBox: "bg-green-100",
      icon: "text-green-600",
      amount: "text-green-700",
      label: "text-green-700/70",
    },

    expense: {
      card: "border-red-200 bg-red-50/70",
      iconBox: "bg-red-100",
      icon: "text-red-600",
      amount: "text-red-700",
      label: "text-red-700/70",
    },

    balance: {
      card: "border-blue-200 bg-blue-50/70",
      iconBox: "bg-blue-100",
      icon: "text-blue-600",
      amount: "text-blue-700",
      label: "text-blue-700/70",
    },

    default: {
      card: "border-border bg-card",
      iconBox: "bg-muted",
      icon: "text-muted-foreground",
      amount: "text-foreground",
      label: "text-muted-foreground",
    },
  };

  const style = styles[type] || styles.default;

  return (
    <Card
      className={`
        rounded-2xl
        border
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-md
        ${style.card}
      `}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div>
          <CardTitle className="text-sm font-semibold">
            {title}
          </CardTitle>

          <p className={`mt-1 text-xs ${style.label}`}>
            This month
          </p>
        </div>

        {Icon && (
          <div
            className={`
              flex size-11
              items-center
              justify-center
              rounded-xl
              ${style.iconBox}
            `}
          >
            <Icon className={`size-5 ${style.icon}`} />
          </div>
        )}
      </CardHeader>

      <CardContent>
        <p
          className={`
            text-3xl
            font-bold
            tracking-tight
            ${style.amount}
          `}
        >
          ${Number(amount || 0).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;