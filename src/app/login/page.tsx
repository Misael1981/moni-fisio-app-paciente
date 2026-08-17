import CardLogin from "@/components/CardLogin"
import FormLogin from "@/components/CardLogin/components/FormLogin"

export default async function LoginPage() {
  return (
    <CardLogin
      title="App do Paciente"
      subtitle="Entre utilizando seu CPF e a senha cadastrada pelo fisioterapeuta."
    >
      <FormLogin />
    </CardLogin>
  )
}
