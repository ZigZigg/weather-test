
const EmptyState = () => {
  return (
    <div className="text-center mt-10 p-8 border rounded-lg bg-[hsl(var(--muted)_/_0.2)]">
      <p className="text-xl mb-2">No cities added yet</p>
      <p className="text-[hsl(var(--muted-foreground))]">
        Add a city in the search box above to get started
      </p>
    </div>
  );
};

export default EmptyState; 