import { Children, Component, ReactElement } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { action } from 'mobx';
import localeContext from 'choerodon-ui/pro/lib/locale-context';
import defaults from 'choerodon-ui/pro/lib/locale-context/default';
import { Locale as ProLocale } from 'choerodon-ui/pro/lib/locale-context/locale';
import defaultsSupports, { Supports } from 'choerodon-ui/pro/lib/locale-context/supports';
import interopDefault from '../_util/interopDefault';

export interface Locale {
  locale: string;
  Pro?: ProLocale;
  Pagination?: Object;
  DatePicker?: Object;
  TimePicker?: Object;
  Calendar?: Object;
  Table?: Object;
  Modal?: ProLocale['Modal'];
  Popconfirm?: Object;
  Transfer?: Object;
  Select?: Object;
  Upload?: Object;
}

export interface LocaleProviderProps {
  locale?: Locale | null;
  supports?: Supports;
  children?: ReactElement<any>;
}

function setMomentLocale(locale?: Locale | null) {
  if (locale && locale.locale) {
    interopDefault(moment).locale(locale.locale);
  } else {
    interopDefault(moment).locale('en');
  }
}

export default class LocaleProvider extends Component<LocaleProviderProps, any> {
  static propTypes = {
    locale: PropTypes.object,
  };

  static defaultProps = {
    locale: {},
  };

  static childContextTypes = {
    c7nLocale: PropTypes.object,
  };

  getChildContext() {
    const { locale } = this.props;
    return {
      c7nLocale: {
        ...locale,
        exist: true,
      },
    };
  }

  componentWillMount() {
    const { locale } = this.props;
    setMomentLocale(locale);
    this.updateContext();
  }

  componentWillReceiveProps(nextProps: LocaleProviderProps) {
    const { locale } = this.props;
    const nextLocale = nextProps.locale;
    if (locale !== nextLocale) {
      setMomentLocale(nextLocale);
    }
  }

  componentDidUpdate() {
    this.updateContext();
  }

  @action
  updateContext() {
    const { locale, supports = defaultsSupports } = this.props;
    const { Pro = defaults } = locale || {};
    localeContext.setLocale(Pro);
    localeContext.setSupports(supports);
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}
