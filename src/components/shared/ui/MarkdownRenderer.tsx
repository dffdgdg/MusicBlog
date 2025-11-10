"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
    content: string;
}

type MotionComponentProps = Omit<React.HTMLAttributes<HTMLElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>;

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
   const components = {
    // Заголовки
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        const { children, ...restProps } = props;
        return (
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-black text-white mt-12 mb-8 first:mt-0 bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent"
                {...restProps as MotionComponentProps}
            >
                {children}
            </motion.h1>
        );
    },
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        const { children, ...restProps } = props;
        return (
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-black text-white mt-12 mb-6 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent"
                {...restProps as MotionComponentProps}
            >
                {children}
            </motion.h2>
        );
    },
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        const { children, ...restProps } = props;
        return (
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4 text-cyan-300"
                {...restProps as MotionComponentProps}
            >
                {children}
            </motion.h3>
        );
    },

    // Параграфы - ИСПРАВЛЕННЫЙ КОМПОНЕНТ
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
        // Проверяем, есть ли внутри изображения
        const hasImage = React.Children.toArray(children).some(child => 
            React.isValidElement(child) && 
            (child.type === 'img' || (child.props as any).node?.tagName === 'img')
        );

        // Если есть изображение, рендерим как div
        if (hasImage) {
            return (
                <div className="text-lg text-slate-300 leading-relaxed mb-6" {...props}>
                    {children}
                </div>
            );
        }

        // Обычный параграф
        return (
            <p className="text-lg text-slate-300 leading-relaxed mb-6" {...props}>
                {children}
            </p>
        );
    },

    // Списки
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => {
        const { children, ...restProps } = props;
        return (
            <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 my-6"
                {...restProps as MotionComponentProps}
            >
                {children}
            </motion.ul>
        );
    },
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => {
        const { children, ...restProps } = props;
        return (
            <motion.ol
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 my-6 list-decimal list-inside"
                {...restProps as MotionComponentProps}
            >
                {children}
            </motion.ol>
        );
    },
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
        <li className="flex items-start gap-3 text-slate-300 leading-relaxed">
            <div className="w-2 h-2 bg-orange-400 rounded-full mt-3 flex-shrink-0" />
            <span {...props} />
        </li>
    ),

    // Блоки кода
    code: ({ inline, className, children, ...props }: React.HTMLAttributes<HTMLElement> & { inline?: boolean; className?: string }) => {
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : 'text';
        
        if (inline) {
            return (
                <code className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-sm font-mono" {...props}>
                    {children}
                </code>
            );
        }

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="my-8 rounded-2xl overflow-hidden border border-orange-500/20"
            >
                <div className="bg-gray-900 px-4 py-2 border-b border-orange-500/20 flex justify-between items-center">
                    <span className="text-orange-300 text-sm font-mono">{language}</span>
                    <button 
                        onClick={() => {
                            navigator.clipboard.writeText(String(children));
                        }}
                        className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                        Копировать
                    </button>
                </div>
                <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    className="!bg-gray-800 !m-0 text-sm"
                    showLineNumbers
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            </motion.div>
        );
    },

    // Цитаты
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => {
        const { children, ...restProps } = props;
        return (
            <motion.blockquote
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="border-l-4 border-orange-500 pl-6 py-4 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-r-2xl my-8"
                {...restProps as MotionComponentProps}
            >
                {children}
            </motion.blockquote>
        );
    },

    // Ссылки
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            className="text-orange-400 hover:text-orange-300 underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        />
    ),

    // Таблицы
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="overflow-x-auto my-8 rounded-2xl border border-orange-500/20">
            <table className="min-w-full divide-y divide-orange-500/20" {...props} />
        </div>
    ),
    th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th className="px-4 py-3 bg-orange-500/10 text-orange-400 font-bold text-left" {...props} />
    ),
    td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td className="px-4 py-3 text-slate-300 border-t border-orange-500/10" {...props} />
    ),

    // Горизонтальная линия
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => {
        const { ...restProps } = props;
        return (
            <motion.hr
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                className="my-12 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent border-0"
                {...restProps as MotionComponentProps}
            />
        );
    },

    // Изображения - ИСПРАВЛЕННЫЙ КОМПОНЕНТ
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <div className="my-8">
            <div className="relative rounded-2xl overflow-hidden border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-purple-500/10">
                <div className="w-full aspect-video flex items-center justify-center text-slate-400">
                    [Изображение: {props.alt || 'Без описания'}]
                </div>
            </div>
            {props.alt && props.alt !== 'Без описания' && (
                <div className="text-center text-slate-400 mt-4 text-sm">
                    {props.alt}
                </div>
            )}
        </div>
    ),
};

    // Функция для преобразования видео-комментариев в HTML
    const processVideoComments = (text: string): string => {
        return text.replace(
            /<!-- VIDEO:(https?:\/\/[^:]+):([^>]*) -->/g,
            (match, url, title) => {
                return `
<div class="video-embed my-8">
  <div class="aspect-video bg-black rounded-2xl overflow-hidden border-2 border-orange-500/30">
    <iframe 
      src="${url}" 
      title="${title}" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen
      class="w-full h-full"
    ></iframe>
  </div>
  ${title && title !== 'Видео' ? `<p class="text-center text-slate-400 mt-2 text-sm">${title}</p>` : ''}
</div>
                `;
            }
        );
    };

    const processedContent = processVideoComments(content);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert prose-lg max-w-none"
        >
            <ReactMarkdown
                components={components}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >
                {processedContent}
            </ReactMarkdown>
        </motion.div>
    );
}