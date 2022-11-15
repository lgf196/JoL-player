import React, { memo, FC, useState, useContext, useMemo } from 'react';
import { defaultTheme, qualityList, qualityListType } from '@/core/config';
import { FlowContext } from '@/core/context';
import toast from '@/components/toast';
import { il8n } from '@/language';
import { defaultLanguage } from '@/core/config';
import './index.scss';
import { qualityKey } from 'types';

export type qualityToggleType = (par: string, key: qualityKey) => void;

export interface QualityType {
  style?: React.CSSProperties;
  videoSrc?: string;
  qualityToggle: qualityToggleType;
}

export type qualityMerge = qualityListType & { url: string };

const Quality: FC<QualityType> = memo(function Quality({ style, videoSrc, qualityToggle }) {
  const reviceProps = useContext(FlowContext);

  const { theme, quality, language, isToast, toastPosition } = reviceProps.propsAttributes!;

  const [isShow, setIsShow] = useState<boolean>(false);

  const qualitySelectList = useMemo(() => {
    if (quality) {
      return quality
        .map(
          (item) =>
            qualityList
              .map((items) => {
                return item.name === items.enName && Object.assign({}, items, { url: item.url });
              })
              .filter((item) => item)[0],
        )
        .sort((a, b) => (b && b.id ? b.id : 1) - (a && a.id ? a.id : 1));
    }
    return [];
  }, [quality]);

  const qualityText = useMemo<Partial<qualityMerge>>(() => {
    let text: qualityMerge[] = [];
    if (videoSrc && qualitySelectList) {
      text = (qualitySelectList as qualityMerge[]).filter((item) => item.url === videoSrc);
    }
    return text.length ? text[0] : { key: '360P', enName: 'SD', name: '标清', id: 1 };
  }, [videoSrc, qualitySelectList]);

  const toggle = (url: string, key: qualityKey) => {
    qualityToggle(url, key);
    isToast &&
      toast({
        message: (
          <div>
            {`${il8n(language || defaultLanguage, 'clarityHint')} ：`}
            <strong style={{ color: '#FF455B' }}>{key}</strong>
          </div>
        ),
        position: toastPosition,
      });
  };
  return (
    <div
      className="JoL-multifunction-multiple"
      onClick={(e) => setIsShow((pre) => !pre)}
      onMouseLeave={(e) => [setIsShow(false)]}
      style={style}
    >
      <p>
        {qualityText
          ? language && language === 'en'
            ? qualityText.enName
            : qualityText.name
          : null}
      </p>
      <div
        className="JoL-multifunction-multiple-container"
        style={{ display: isShow ? 'block' : 'none' }}
      >
        {qualitySelectList && qualitySelectList.length ? (
          <ul className="JoL-multifunction-multiple-layer">
            {qualitySelectList.map((item, index) => (
              <li
                key={index}
                onClick={() =>
                  toggle(item && item.url ? item.url : '', item && item.key ? item.key : '360P')
                }
                style={{
                  color:
                    qualityText.key === (item && item.key ? item.key : null)
                      ? theme
                        ? theme
                        : defaultTheme
                      : '#fff',
                }}
              >
                <p>
                  {item && item.name
                    ? language && language === 'en'
                      ? item.enName
                      : item.name
                    : null}
                </p>
                <p>{item && item.key ? item.key : null}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
});
export default Quality;
