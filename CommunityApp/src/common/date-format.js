import moment from 'moment';

export class DateFormatValueConverter {
    toView(value, format = 'MM/DD/YYYY') {
        return moment(value).format(format);
    }
}