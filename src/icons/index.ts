/**
 *
 * @requires @types/webpack-env
 */
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().map(requireContext);
const svgs = require.context('./svg', true, /\.svg$/);
requireAll(svgs);

export default requireAll;
