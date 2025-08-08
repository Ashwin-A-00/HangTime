
type Props = {
  condition: 'sunny' | 'cloudy' | 'rainy';
  onRestart: () => void;
};

const SUGGESTIONS: Record<string, string[]> = {
  sunny: ['Sip a cool drink 🥤', 'Read a chapter 📖', 'Quick walk outside 🚶'],
  cloudy: ['Make a cup of tea 🍵', 'Tidy a shelf 🧹', 'Call a friend ☎️'],
  rainy: ['Watch an episode 📺', 'Journal a page 📝', 'Stretch for 10 minutes 🧘']
};

export default function ActivitySuggestions({ condition, onRestart }: Props) {
  const list = SUGGESTIONS[condition] ?? SUGGESTIONS.cloudy;

  return (
    <section className="container py-12 animate-fade-in" aria-labelledby="ideas-title">
      <h2 id="ideas-title" className="font-display text-3xl font-semibold text-center mb-6">While You Wait…</h2>
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {list.slice(0,3).map((txt, i) => (
          <div key={i} className="p-5 rounded-xl bg-card card-shadow tilt hover-scale">
            <div className="text-lg font-medium">{txt}</div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button onClick={onRestart} className="px-6 py-3 rounded-md bg-secondary text-secondary-foreground hover-scale">Start over</button>
      </div>
    </section>
  );
}
