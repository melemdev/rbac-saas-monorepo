import { SessionView } from "@/components/views/session-view"
import { authService } from "@/lib/api"

export default async function Page() {
  const data = await authService.getSessions()

  return <SessionView data={data} />
}