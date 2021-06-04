 'use strict';

 // Dependencies
 var request = require('sync-request');
 var Promise = require('promise');
 var _ = require('lodash');
 var queryString = require('query-string');
 var { v4: uuidv4 } = require('uuid');

 var _apiUrl = 'https://api.robinhood.com/';
 var headers = {
    Host: 'api.robinhood.com',
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate',
    Referer: 'https://robinhood.com/',
    Origin: 'https://robinhood.com'
};
  var _endpoints = {
    login: 'oauth2/token/',
    logout: 'oauth2/revoke_token/',
    investment_profile: 'user/investment_profile/',
    accounts: 'accounts/',
    ach_iav_auth: 'ach/iav/auth/',
    ach_relationships: 'ach/relationships/',
    ach_transfers: 'ach/transfers/',
    ach_deposit_schedules: 'ach/deposit_schedules/',
    applications: 'applications/',
    dividends: 'dividends/',
    edocuments: 'documents/',
    earnings: 'marketdata/earnings/',
    instruments: 'instruments/',
    margin_upgrade: 'margin/upgrades/',
    markets: 'markets/',
    notifications: 'notifications/',
    notifications_devices: 'notifications/devices/',
    orders: 'orders/',
    cancel_order: 'orders/', //API expects https://api.robinhood.com/orders/{{orderId}}/cancel/
    password_reset: 'password_reset/request/',
    quotes: 'quotes/',
    document_requests: 'upload/document_requests/',
    user: 'user/',

    user_additional_info: 'user/additional_info/',
    user_basic_info: 'user/basic_info/',
    user_employment: 'user/employment/',
    user_investment_profile: 'user/investment_profile/',

    options_chains: 'options/chains/',
    options_positions: 'options/aggregate_positions/',
    options_instruments: 'options/instruments/',
    options_marketdata: 'marketdata/options/',

    watchlists: 'watchlists/',
    positions: 'positions/',
    fundamentals: 'fundamentals/',
    sp500_up: 'midlands/movers/sp500/?direction=up',
    sp500_down: 'midlands/movers/sp500/?direction=down',
    news: 'midlands/news/',
    tag: 'midlands/tags/tag/'
  };
 
class Robinhood {
    constructor(account){
        this.AccountURL = account != null ? account.url : null;
        this.UserID = account != null ? account.user_id : null;
        this.AccountNumber = account != null ? account.account_number : null;
        this.AccountType = account != null ? account.type : null;
    }

    static Login(credentials)
    {
        headers.Authorization = `Bearer ${credentials}`;
        var res = Get(_endpoints.accounts)[0];
        return new Robinhood(res);
    }

    Account = () => Get(_endpoints.accounts);
    InvestmentProfile = () => Get(_endpoints.investment_profile);
    Fundamentals = (symbol) => Get(`${_endpoints.fundamentals}/${symbol.toUpperCase()}/`);
    Instruments = (symbol) => Get(`${_endpoints.instruments}?query=${symbol.toUpperCase()}`);
    QuoteData = (...symbols) => Get(`${_endpoints.quotes}?symbols=${symbols.join(',').toUpperCase()}`);
    User = () => Get(_endpoints.user);
    Dividends = () => Get(_endpoints.dividends);
    Positions = () => Get(_endpoints.positions);
    NonZeroPositions = () => Get(`${_endpoints.positions}?nonzero=true`);
    News = (symbol) => Get(`${_endpoints.news}/${symbol}/`);
    Tag = (tag) => Get(`${_endpoints.tag}${tag}`);
    URL = (url) => GetURL(url);
}

const GetURL = (endpoint, json) => {
    var getRequest = {
        headers: headers
    };
    if(json != null) {
        getRequest.json = json;
    }
    var res = request('GET', endpoint, getRequest);
    var resJson = JSON.parse(res.getBody('utf8'));
    if(resJson.results != null) return resJson.results;
    return resJson;
};

const Get = (endpoint, json) => GetURL(`${_apiUrl}${endpoint}`, json);
 
 module.exports = Robinhood;