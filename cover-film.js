(() => {
  const cover = document.querySelector('.novel-cover-link');
  const dialog = document.querySelector('#cover-film');
  const videoId = cover.dataset.youtubeId;
  if (!/^[\w-]{11}$/.test(videoId) || !dialog.showModal || location.protocol === 'file:') return;

  cover.setAttribute('aria-label', 'Play an eight-second introduction to The Tingsted Cipher, then open the book page');
  cover.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    dialog.showModal();
    const goToBook = () => location.assign(cover.href);
    const timeout = setTimeout(goToBook, 12000);
    let player;
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player('film-player', {
        videoId,
        playerVars: { playsinline: 1, end: 8, origin: location.origin },
        events: {
          onReady: ({target}) => { target.mute(); target.playVideo(); },
          onStateChange: ({data}) => {
            if (data === YT.PlayerState.PLAYING) clearTimeout(timeout);
            if (data === YT.PlayerState.ENDED) goToBook();
          },
          onError: goToBook,
          onAutoplayBlocked: goToBook
        }
      });
    };
    dialog.addEventListener('cancel', goToBook, {once: true});
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.onerror = goToBook;
    document.head.append(script);
    window.addEventListener('pagehide', () => {
      clearTimeout(timeout);
      player?.destroy();
      dialog.close();
    }, {once: true});
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) location.reload();
  });
})();
