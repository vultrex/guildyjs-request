interface RequestOptions {
    method: "GET" | "POST" | "PUT" | "DELETE";
    endpoint: string;
    data?: any;
}

/**
 * @see https://www.geeksforgeeks.org/http-headers-content-type/
 */

type contenttypeapplication = 'application/EDI-X12' | 'application/javascript' | 'application/octet-stream' | 'application/ogg' | 'application/pdf' | 'application/xhtml+xml' | 'application/x-shockwave-flash' | 'application/json' | 'application/ld+json' | 'application/xml' | 'application/zip' | 'application/x-www-form-urlencoded';
type contenttypeaudio = 'audio/mpeg' | 'audio/x-ms-wma' | 'audio/vnd.rn-realaudio' | 'audio/x-wav';
type contenttypeimage = 'image/gif' | 'image/jpeg' | 'image/png' | 'image/tiff' | 'image/vnd.microsoft.icon' | 'image/x-icon' | 'image/vnd.djvu' | 'image/svg+xml';
type contenttypemultipart = 'multipart/mixed' | 'multipart/alternative' | 'multipart/related' | 'multipart/form-data';
type contenttypetext = 'text/css' | 'text/csv' | 'text/html' | 'text/javascript' | 'text/plain' | 'text/xml';
type contenttypevideo = 'video/mpeg' | 'video/mp4' | 'video/quicktime' | 'video/x-ms-wmv' | 'video/x-msvideo' | 'video/x-flv' | 'video/webm';
type contenttypevnd = 'application/vnd.oasis.opendocument.text' | 'application/vnd.oasis.opendocument.spreadsheet' | 'application/vnd.oasis.opendocument.presentation' | 'application/vnd.oasis.opendocument.graphics' | 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' | 'application/vnd.ms-powerpoint' | 'application/vnd.openxmlformats-officedocument.presentationml.presentation' | 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' | 'application/vnd.mozilla.xul+xml'
type other = 'X-Audit-Log-Reason'

import fetch from "cross-fetch";

export class Request {
    private apiUrl: string;
    constructor() {
        this.apiUrl = 'https://api.guilded.gg';
    };

    async req(opt: RequestOptions, type:
        contenttypeapplication
        | contenttypeaudio
        | contenttypeimage
        | contenttypemultipart
        | contenttypetext
        | contenttypevideo
        | contenttypevnd
        | other) {
        const request = {
            method: opt.method,
            headers: {
                'Content-Type': type,
            }
        };

        const data = (opt.data) ? JSON.stringify(opt.data) : {};
        if (opt.method !== 'GET') {
            if (opt.method !== 'DELETE') {
                request["body"] = data;
            };
        };

        return new Promise(async (resolve, reject) => {
            return await fetch(`${this.apiUrl}${opt.endpoint}`, request).then((x) => {
                x.json().then((res) => {
                    return resolve(res);
                }).catch(() => {
                    resolve(null);
                    console.log(x)
                })
            })
        });
    };

    get Websocket() {
        return 'wss://api.guilded.gg/';
    };
}