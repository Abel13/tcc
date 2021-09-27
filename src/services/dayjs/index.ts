import { ILocale } from './interfaces';

export const dayjsConfig: Partial<ILocale> = {
  name: 'pt-BR',
  weekdays: [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ],
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  monthsShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ],
  weekdaysMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  ordinal: n => `${n}º`, // ordinal Function (number) => return number + output
  formats: {
    // abbreviated format options allowing localization
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A',
  },
  relativeTime: {
    // relative time format strings, keep %s %d as the same
    future: 'em %s', // e.g. in 2 hours, %s been replaced with 2hours
    past: '%s atrás',
    s: 'um segundo',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d dias', // e.g. 2 hours, %d been replaced with 2
    d: 'um dia',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d mêses',
    y: 'a ano',
    yy: '%d anos',
  },
};
