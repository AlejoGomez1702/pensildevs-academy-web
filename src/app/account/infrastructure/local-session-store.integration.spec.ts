import { aSession } from '../domain/member.fixtures';
import { LocalSessionStore, SESSION_STORAGE_KEY } from './local-session-store';

describe('Session kept in the browser', () => {
  beforeEach(() => localStorage.clear());

  it('keeps the session between visits', () => {
    new LocalSessionStore(localStorage).save(aSession());

    expect(new LocalSessionStore(localStorage).load()).toEqual(aSession());
  });

  it('forgets the session', () => {
    const store = new LocalSessionStore(localStorage);
    store.save(aSession());

    store.clear();

    expect(store.load()).toBeNull();
    expect(localStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
  });

  it.each(['not json', '{"accessToken":1}', 'null', '{"member":{}}'])(
    'ignores a stored value it does not understand: %s',
    (stored) => {
      localStorage.setItem(SESSION_STORAGE_KEY, stored);

      expect(new LocalSessionStore(localStorage).load()).toBeNull();
    },
  );

  it('works without storage (private mode, blocked cookies)', () => {
    const blocked = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    } as unknown as Storage;
    const store = new LocalSessionStore(blocked);

    expect(() => store.save(aSession())).not.toThrow();
    expect(store.load()).toBeNull();
    expect(() => store.clear()).not.toThrow();
  });
});
