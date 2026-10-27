// Reviewed guides, researched from official docs and evidence-checked (see VERIFICATION.md).
import github from '../../guides/github.json';
import slack from '../../guides/slack.json';
import shopify from '../../guides/shopify.json';
import servicenow from '../../guides/servicenow.json';
import gmail from '../../guides/google-gmail.json';
import spotify from '../../guides/spotify.json';

const ORDER = ['easy', 'moderate', 'hard', 'very_hard'];
export default [github, slack, shopify, servicenow, gmail, spotify]
  .sort((a, b) => ORDER.indexOf(a.difficulty) - ORDER.indexOf(b.difficulty));
