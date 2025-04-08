"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, timeAgo } from "@/lib/utils";
import { toast } from "sonner";
import { UserSession } from "@/lib/api";
import { useDeleteSession, useSessions } from "@/lib/api/hooks/use-session";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
  HeaderGroup,
  Header,
  Cell,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export function SessionView({ data }: { data: UserSession[] }) {
  const { data: session } = useSession();
  const { data: list, error, isLoading } = useSessions();
  const deleteSession = useDeleteSession();
  const sessions = list || [];
  const router = useRouter()

  const handleRevokeSession = async (sessionId: string) => {
    try {
      if (sessionId == session?.sub) {
        toast.error("You cannot revoke your session");
        return
      }

      await deleteSession.mutateAsync(sessionId);
      toast.success("Session revoked successfully");
    } catch (error) {
      toast.error("Failed to revoke session");
    }
  };

  const columns: ColumnDef<UserSession>[] = [
    {
      accessorKey: "userId",
      header: "User",
      cell: ({ row }: { row: Row<UserSession> }) => {
        const isCurrentUser = row.original.session_id === session?.sub;
        return (
          <div className="flex items-center gap-2">
            <span>{row.original.session_id}</span>
            {isCurrentUser && (
              <Badge variant="secondary" className="text-xs">
                Current Session
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "lastActivity",
      header: "Last Activity",
      cell: ({ row }: { row: Row<UserSession> }) => timeAgo(row.original.lastActivity),
    },
    {
      id: "actions",
      cell: ({ row }: { row: Row<UserSession> }) => {
        const isCurrentUser = row.original.session_id === session?.sub;
        return (
          <div className="flex justify-end">
            <Button
              variant="link"
              size="sm"
              onClick={() => router.push(`/users/${row.original.userId}`)}
            >
              View Profile
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRevokeSession(row.original.session_id)}
            >
              Revoke
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: sessions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <Card className="bg-destructive/10">
        <CardContent className="p-6">
          <div className="text-destructive text-center">
            Error loading sessions. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Active Sessions</h2>
        <p className="text-sm text-muted-foreground">
          Manage your active sessions across devices
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup: HeaderGroup<UserSession>) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header: Header<UserSession, unknown>) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row: Row<UserSession>) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={cn(
                        row.original.userId === session.sub &&
                        "bg-muted/50"
                      )}
                    >
                      {row.getVisibleCells().map((cell: Cell<UserSession, unknown>) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No active sessions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}