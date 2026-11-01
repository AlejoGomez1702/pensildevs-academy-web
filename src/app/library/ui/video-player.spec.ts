import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { aHostedVideo, aYouTubeVideo } from '../domain/learning-content.fixtures';
import { VideoPlayer } from './video-player';

describe('Video player', () => {
  let fixture: ComponentFixture<VideoPlayer>;
  let player: HTMLElement;

  const iframe = () => player.querySelector('iframe');
  const playButton = () => player.querySelector<HTMLButtonElement>('button') as HTMLButtonElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(VideoPlayer);
    fixture.componentRef.setInput('video', aYouTubeVideo('oFdO0jTK0n8'));
    fixture.componentRef.setInput('title', 'Conoce Pensil.Pos');
    player = fixture.nativeElement;
    document.body.append(player);
    await fixture.whenStable();
  });

  afterEach(() => player.remove());

  it('loads nothing from YouTube until the video is played', () => {
    expect(iframe()).toBeNull();
    expect(player.querySelector('img')).toBeNull();
  });

  it('offers a play button named after the video', () => {
    expect(playButton().textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'Reproducir video: Conoce Pensil.Pos',
    );
  });

  it('plays the video in privacy-enhanced mode, named after the video, and moves focus to it', async () => {
    playButton().click();
    await fixture.whenStable();

    expect(iframe()?.getAttribute('src')).toBe(
      'https://www.youtube-nocookie.com/embed/oFdO0jTK0n8?autoplay=1&rel=0',
    );
    expect(iframe()?.getAttribute('title')).toBe('Video: Conoce Pensil.Pos');
    expect(iframe()?.hasAttribute('allowfullscreen')).toBe(true);
    expect(playButton()).toBeNull();
    expect(document.activeElement).toBe(iframe());
  });

  it('links to the video on YouTube, in a new tab, in case embedding fails', () => {
    const link = player.querySelector<HTMLAnchorElement>(
      'a[href="https://www.youtube.com/watch?v=oFdO0jTK0n8"]',
    );

    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.textContent).toContain('Ver en YouTube');
  });
});

describe('Video player with a video hosted by the academy', () => {
  let fixture: ComponentFixture<VideoPlayer>;
  let player: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(VideoPlayer);
    fixture.componentRef.setInput('video', aHostedVideo());
    fixture.componentRef.setInput('title', 'Conoce Pensil.Pos en 2 minutos');
    player = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('downloads nothing but the poster until played, with Spanish captions on by default', () => {
    const video = player.querySelector('video');
    const track = video?.querySelector('track');

    expect(video?.getAttribute('preload')).toBe('none');
    expect(video?.getAttribute('poster')).toBe('/media/intro.jpg');
    expect(video?.hasAttribute('controls')).toBe(true);
    expect(video?.getAttribute('aria-label')).toBe('Video: Conoce Pensil.Pos en 2 minutos');
    expect(video?.querySelector('source')?.getAttribute('src')).toBe('/media/intro.mp4');
    expect(track?.getAttribute('kind')).toBe('captions');
    expect(track?.getAttribute('srclang')).toBe('es');
    expect(track?.getAttribute('src')).toBe('/media/intro.es.vtt');
    expect(track?.hasAttribute('default')).toBe(true);
    expect(player.querySelector('iframe')).toBeNull();
  });

  it('offers the transcript instead of a YouTube link', () => {
    const transcript = player.querySelector('details');

    expect(transcript?.querySelector('summary')?.textContent).toContain(
      'Leer lo que muestra el video',
    );
    expect(transcript?.querySelectorAll('li')).toHaveLength(2);
    expect(player.querySelector('a[href*="youtube"]')).toBeNull();
  });
});
