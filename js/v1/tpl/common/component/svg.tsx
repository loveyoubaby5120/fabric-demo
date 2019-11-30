import * as React from 'react';

export const EditSvg = (props: any) => (
    <svg viewBox='0 0 1024 1024' width='42' height='42' className={props.className || ''} style={props.style || {}} onClick={props.onClick}>
        <path d='M689.59393838 258.75109776c-16.43231641-17.37367418-43.18108399-17.37367418-59.61044036 0L596.18934869
         294.66478173l79.45295768 84.21895134 33.79710992-35.90184323c16.61289129-17.38255487 16.61289129-45.63808691
         0-63.02360184l-19.84547791-21.20719024z m-109.44615368 52.71603084l-221.15689357
         234.9161094V551.34164732h19.09653629v19.09949632h19.09949635v19.09949636h19.09949633v19.09653628h19.0965363V635.9395098l224.40724157-240.25046979-79.64241327-84.22191141zM339.89139478
         566.81484404l-8.21467844 8.59062901-29.98135419 114.98181039 117.06878231-36.47909065
         6.49181582-7.07202381h-8.96954017v-19.09653627h-19.09949634v-19.09949636h-19.09949635v-19.09653629h-19.09653629v-19.09949634H339.89139478v-3.62925968z m-22.92117217
         177.62058044v36.08833874h397.81835486v-36.08833875H316.97022262z' fill={props.color || '#E55800'}></path>
    </svg>
);

export const ErrorSvg = (props: any) => (
    <svg viewBox='0 0 1024 1024' width='21' height='21' className={props.className || ''} style={props.style || {}} onClick={props.onClick}>
        <path d='M523.264 284.992h-22.016c-13.568 0-24.64 11.072-24.64 24.704V583.04c0 13.632 11.008 24.832 24.64 24.832h22.016c13.696 0
        24.768-11.2 24.768-24.832V309.696c0-13.632-11.072-24.704-24.768-24.704z m-11.2-249.6c-263.296 0-476.672 213.376-476.672
        476.672 0 263.04 213.376 476.544 476.672 476.544 263.104 0 476.672-213.504 476.672-476.544 0-263.296-213.568-476.672-476.672-476.672z
        m-4.352 893.824c-229.056 0-414.656-185.664-414.656-414.72 0-229.12 185.6-414.656 414.656-414.656 229.248 0 414.784 185.536 414.784
        414.656 0 229.056-185.536 414.72-414.784 414.72z m14.144-234.944h-20.608c-13.568 0-24.64 11.072-24.64 24.96v25.92c0 13.696 11.008
        24.896 24.64 24.896h20.608c13.696 0 24.768-11.2 24.768-24.896v-25.92c0-13.952-11.008-24.96-24.768-24.96z' fill={props.color || '#E55800'}></path>
    </svg>
);

export const QuestionSvg = (props: any) => (
    <svg viewBox='0 0 1024 1024' width='18' height='18' className={props.className || ''} style={props.style || {}} onClick={props.onClick}>
        <path d='M455.408941 794.925176h84.87153v-84.871529h-84.87153v84.871529z m130.168471-265.938823c-42.465882 28.310588-62.253176
        62.223059-62.253177 99.026823v25.449412H455.378824v-31.111529c-2.831059-50.928941 22.648471-96.195765 67.915294-130.168471
        50.898824-36.743529 76.378353-73.547294 70.716235-107.52-5.662118-50.898824-33.942588-79.209412-87.702588-82.04047-62.253176-2.831059-101.857882
        33.972706-115.983059 110.351058l-76.408471-19.817411c22.648471-113.152 93.364706-166.912 206.546824-164.080941 99.026824
        5.662118 149.955765 53.76 161.249882 147.124705 2.861176 56.591059-28.280471 107.52-96.165647 152.786824zM512 59.301647C263.017412
        59.331765 59.331765 263.017412 59.331765 512c0 249.012706 203.685647 452.728471 452.668235 452.728471S964.668235 760.982588 964.668235
        512 761.012706 59.331765 512 59.331765z m0 961.957647C231.905882 1021.289412 2.710588 792.094118 2.710588 512 2.710588 231.905882
        231.905882 2.710588 512 2.710588S1021.289412 231.905882 1021.289412 512 792.094118 1021.289412 512 1021.289412z' fill={props.color || '#fff'}></path>
    </svg>
);

export const UpSvg = (props: any) => (
    <svg viewBox='0 0 1024 1024' width='26' height='26' className={props.className || ''} style={props.style || {}} onClick={props.onClick}>
        <path d='M962.56 512c0 249.32352-202.20928 450.56-450.56 450.56S61.44 760.32 61.44 512C61.44 263.63904 263.64928 61.44 512
        61.44s450.56 201.23648 450.56 450.56zM487.44448 352.9728L262.66624 576.78848c-6.8608 6.8608-9.8304 15.69792-9.8304
        24.54528a34.37568 34.37568 0 0 0 58.91072 24.53504l200.2432-200.27392 197.30432 199.2704c13.75232 13.75232 35.34848
        13.75232 48.10752 0 13.73184-13.73184 13.73184-35.328 0-48.09728L535.56224 352.9728c-6.8608-6.8608-14.72512-9.80992-24.54528-9.80992-7.85408
        0-16.6912 2.93888-23.57248 9.80992z'  fill={props.color || '#fff'}>
        </path>
    </svg>
);
