// Файл: src/components/AdminContainer.tsx

export default function AdminContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-20">
      {children}
    </div>
  );
}