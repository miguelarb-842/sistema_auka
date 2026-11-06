import { Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando contenido"
      className="auka-container py-10"
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-32 rounded-full" />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-4">
          <Skeleton className="h-4 w-40 rounded-full" />
          <Skeleton className="h-14 w-full max-w-lg rounded-2xl" />
          <Skeleton className="h-14 w-4/5 max-w-md rounded-2xl" />
          <Skeleton className="h-5 w-full max-w-xl rounded-full" />
          <Skeleton className="h-5 w-3/4 max-w-md rounded-full" />
          <div className="flex gap-3 pt-3">
            <Skeleton className="h-11 w-40 rounded-full" />
            <Skeleton className="h-11 w-40 rounded-full" />
          </div>
        </div>
        <Skeleton className="aspect-[4/5] w-full max-w-md rounded-[2.5rem]" />
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-border bg-surface"
          >
            <Skeleton className="aspect-[16/10] w-full rounded-none" />
            <div className="space-y-3 p-6">
              <Skeleton className="h-4 w-28 rounded-full" />
              <Skeleton className="h-6 w-3/4 rounded-full" />
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-5/6 rounded-full" />
              <Skeleton className="mt-4 h-10 w-32 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
