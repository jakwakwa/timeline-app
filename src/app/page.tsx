import TimelineView from '@/components/TimelineView';

export default function Home() {
  return (
    <div>
      <header style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
        <h1 style={{ margin: 0, color: '#333', fontSize: '2.5rem' }}>Dr. Arthur Frost Ministry</h1>
        <p style={{ margin: '0.5rem 0 0', color: '#666' }}>Teachings & Sermons</p>
      </header>
      <main>
        <TimelineView />
      </main>
    </div>
  );
}
