type StatCardProps = {
  icon: React.ReactNode
  title: string
  value: string | number
}

const StatCard = ({ icon, title, value }: StatCardProps) => {
  return (
    <div className="bg-card rounded-xl border p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <span className="text-muted-foreground text-xs tracking-wide uppercase">
          {title}
        </span>
      </div>

      <p className="text-lg font-semibold">{value}</p>
    </div>
  )
}

export default StatCard
