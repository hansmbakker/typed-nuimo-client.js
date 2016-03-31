////
// withNuimo.js
//////

import noble = require('noble');
import event = require('events');

/**
 * @return {Promise<NuimoClient, error>}
 */
export function withNuimo(): Promise<NuimoClient>;

/////////
/// client.js
////////

/**
 * @class
 */
export class NuimoClient {
  /**
   * @param {event.EventEmitter}
   * @param {noble.Peripheral}
   */
  constructor (emitter: event.EventEmitter, matrix: noble.Characteristic, peripheral: noble.Peripheral);

  /**
   * @return {Promise<Buffer>}
   */
  leds: Promise<Buffer>;

  /**
   * Use an array of strings of 0 and 1s with one element per LED row or an array of integers (0 and 1s)
   * @param {Array}
   * return Buffer
   */
  createLEDMatrixBuffer(data: Array<String>): Buffer;
  createLEDMatrixBuffer(data: Array<Number>): Buffer;

  /**
   * @param Buffer
   * @param {Number?} (in percentage)
   * @param {Number?} (in seconds)
   * @return {Promise<null>}
   */
  writeLEDS (state: Buffer, brightness?: Number, delay?: Number): Promise<Object>;

  /**
   * @param {Function<Update, void>}
   */
  listen (callback: Function): void;

  /**
   * @param {Function<void>}
   */
  close (callback: Function): void;
}

///////////
// update.js
///////////

/**
 * @class
 */
export class Update {
  constructor (type: String, time: Date);

  time: Date;

  type: String;
}


/**
 * @class
 */
export class ClickUpdate extends Update {
  constructor(down: Boolean);

  down: Boolean;

  accept(vistor: any): any;
}


/**
 * @class
 */
export class TurnUpdate extends Update {
  constructor(offset: Number);

  offset: Number;

  accept(vistor: any): any;
}


/**
 * @class
 */
export class SwipeUpdate extends Update {
  constructor(direction: String);

  direction: String;

  accept(vistor: any): any;
}


/**
 * parses the updates buffer representation, and returns an update
 * see here https://cdn-images-2.medium.com/max/1600/1*lL52VX2WKOUu1ezul4FQrQ.jpeg
 *
 * @param {UUID} (a uuid string)
 * @param {Buffer} (a node buffer)
 * @return Update
 */
export function updateFactory(characteristicUUID: string, buffer: Buffer): Update;
