import { UserView } from "@/components/views/user-view"

interface UsersPageProps {
  params: Promise<{ userId: string }>
}

export default async function UsersPage({ params }: UsersPageProps) {
  const { userId } = await params
  return <UserView userId={userId} />
}