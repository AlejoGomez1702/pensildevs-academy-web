import { findTopic, PENSIL_DEVS_URL, topicPath, TOPICS, topicsOf, topicSiteUrl } from './topic-catalog';

describe('Topic catalog', () => {
  it('teaches about Pensil.Pos as a product and the four services of pensildevs.com', () => {
    expect(topicsOf('product').map((topic) => topic.slug)).toEqual(['pensil-pos']);
    expect(topicsOf('service').map((topic) => topic.slug)).toEqual([
      'tiendas-en-linea',
      'desarrollo-web',
      'automatizacion',
      'consultoria-y-apps-moviles',
    ]);
  });

  it('finds a topic only inside its own group', () => {
    expect(findTopic('product', 'pensil-pos')?.name).toBe('Pensil.Pos');
    expect(findTopic('service', 'pensil-pos')).toBeUndefined();
    expect(findTopic('service', 'nope')).toBeUndefined();
  });

  it('builds the academy path and the pensildevs.com address of a topic with the same segments', () => {
    const pos = TOPICS.find((topic) => topic.slug === 'pensil-pos');
    const shop = TOPICS.find((topic) => topic.slug === 'tiendas-en-linea');
    if (!pos || !shop) {
      throw new Error('Missing topics');
    }

    expect(topicPath(pos)).toBe('/productos/pensil-pos');
    expect(topicSiteUrl(shop)).toBe(`${PENSIL_DEVS_URL}/servicios/tiendas-en-linea`);
  });
});
