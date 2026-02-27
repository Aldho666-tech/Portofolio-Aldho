const urls = [
    'https://cdn.coverr.co/videos/coverr-a-person-walking-in-a-dark-hallway-2516/1080p.mp4',
    'https://cdn.coverr.co/videos/coverr-looking-up-at-a-tall-modern-building-3733/1080p.mp4',
    'https://cdn.coverr.co/videos/coverr-street-at-night-with-city-lights-in-motion-5161/1080p.mp4'
];

async function check() {
    for (const url of urls) {
        try {
            const res = await fetch(url, { method: 'HEAD' });
            console.log(url, res.status);
        } catch (e) {
            console.log(url, 'error', e.message);
        }
    }
}
check();
