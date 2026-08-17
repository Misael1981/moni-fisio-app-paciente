import CardLogin from "@/components/CardLogin"
import ChangePinForm from "@/components/CardLogin/components/ChangePinForm"

export default async function ChangePinPage() {
  return (
    <CardLogin
      title="Defina seu novo PIN"
      subtitle="Por segurança, crie uma senha de 6 números só sua."
    >
      <ChangePinForm />
    </CardLogin>
  )
}
