import React from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import "./MessageForm.css";

export const EmojiComp = () => {
  

  return (
    <div className="block-emoji">
      <Picker  set="apple" />
    </div>
  );
};

{
  /* <Picker onSelect={this.addEmoji} />
<Picker title='Pick your emoji…' emoji='point_up' />
<Picker style={{ position: 'absolute', bottom: '20px', right: '20px' }} />
<Picker i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }} /> */
}
