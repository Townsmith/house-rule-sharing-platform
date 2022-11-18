'use strict';

/**
 * game-designer service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::game-designer.game-designer');
