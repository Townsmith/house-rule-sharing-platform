'use strict';

/**
 * game-info service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::game-info.game-info');
