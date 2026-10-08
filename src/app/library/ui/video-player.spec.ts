import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { aYouTubeVideo } from '../domain/learning-content.fixtures';
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
