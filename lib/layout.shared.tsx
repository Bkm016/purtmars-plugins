import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      url: '/',
      title: (
        <span className="flex items-center gap-2 font-medium">
          <Image
            src="/img/icon.png"
            alt=""
            width={22}
            height={22}
            className="rounded-sm"
            priority
          />
          <span style={{ color: 'rgb(45, 125, 195)' }}>{appName}</span>
        </span>
      ),
    },
    links: [
      {
        text: '文档源码',
        url: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
        external: true,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}