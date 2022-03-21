<script setup>
  import DocumentDisplay from "../components/DocumentDisplay.vue";

  let words = [
    {
      symbol: "Ə",
      sound: "uh",
      name: "Schwa",
      words: [
        "y_ea_rn",
        "_u_pset",
        "llam_a_",
        "pterodact_y_l",
        "ident_i_ty",
        "_o_f",
        "vow_e_l",
      ],
    },
    {
      symbol: "A",
      sound: "ah",
      name: "Short A",
      words: ["_a_pple"],
    },
    {
      symbol: "Ā",
      sound: "ay",
      name: "Long A",
      words: ["am_a_zing", "tod_ay_", "_ei_ght", "sl_eigh_"],
    },
    {
      symbol: "Ä",
      sound: "aw",
      name: "Another A",
      words: ["ll_a_ma", "c_o_nscious"],
    },
    {
      symbol: "B",
      sound: "b",
      name: "B",
      words: ["_b_liss"],
    },
    {
      symbol: "D",
      sound: "d",
      name: "D",
      words: ["_d_ip", "tenta_ti_ve", "aesthe_t_ic"],
    },
    {
      symbol: "E",
      sound: "eh",
      name: "Short E",
      words: ["_e_ssay", "r_ea_d", "_ae_sthetic"],
    },
    {
      symbol: "Ē",
      sound: "ee",
      name: "Long E",
      words: ["r_e_search", "s_ee_ing", "necessar_y_", "aer_i_al", "r_ea_d"],
    },
    {
      symbol: "F",
      sound: "f",
      name: "F",
      words: ["_f_ish", "_ph_one", "tou_gh_"],
    },
    {
      symbol: "G",
      sound: "g",
      name: "Hard G",
      words: ["_g_ood"],
    },
    {
      symbol: "G'Z",
      sound: "gz",
      name: "X",
      words: ["e_x_ample"],
    },
    {
      symbol: "H",
      sound: "h",
      name: "H",
      words: ["_h_yperbole"],
    },
    {
      symbol: "I",
      sound: "ih",
      name: "Short I",
      words: ["_i_nside", "f_y_tte"],
    },
    {
      symbol: "Ī",
      sound: "eye",
      name: "Long I",
      words: ["ups_i_de", "_eye_", "d_y_namic"],
    },
    {
      symbol: "J",
      sound: "j",
      name: "J",
      words: ["_j_ust", "ba_dge_"],
    },
    {
      symbol: "K",
      sound: "k",
      name: "Hard C / K",
      words: ["_c_oo_k_ie", "sto_ck_s"],
    },
    {
      symbol: "K'S",
      sound: "ks",
      name: "X",
      words: ["a_x_is"],
    },
    {
      symbol: "L",
      sound: "l",
      name: "L",
      words: ["_l_eft", "_ll_ama"],
    },
    {
      symbol: "M",
      sound: "m",
      name: "M",
      words: ["_m_eet"],
    },
    {
      symbol: "N",
      sound: "n",
      name: "N",
      words: ["_n_eck", "_kn_ot", "_pn_eumonia", "_mn_emonic"],
    },
    {
      symbol: "Ō",
      sound: "oh",
      name: "Long O",
      words: ["f_oe_", "_o_rganic", "_o_rganism"],
    },
    {
      symbol: "Ô",
      sound: "awe",
      name: "AW",
      words: ["_awe_some", "sh_o_rt", "p_aw_"],
    },
    {
      symbol: "O͞O",
      sound: "oo",
      name: "Half U",
      words: ["b_oo_ing", "y_ou_", "concl_u_de"],
    },
    {
      symbol: "P",
      sound: "p",
      name: "P",
      words: ["_p_umpkin", "a_pp_le"],
    },
    {
      symbol: "R",
      sound: "r",
      name: "R",
      words: ["pape_r_"],
    },
    {
      symbol: "S",
      sound: "s",
      name: "Soft C / S",
      words: ["_ps_alm", "ne_c_e_ss_ary", "in_s_tan_ce_"],
    },
    {
      symbol: "SH",
      sound: "sh",
      name: "SH",
      words: [
        "_sh_ort",
        "na_ti_on",
        "fu_chsi_a",
        "con_sci_ous",
        "_sch_lep",
        "fi_ss_ion",
      ],
    },
    {
      symbol: "T",
      sound: "t",
      name: "T",
      words: ["ei_ght_", "_pt_erodac_t_yl"],
    },
    {
      symbol: "U",
      sound: "uh",
      name: "U",
      words: ["vo_w_el"],
    },
    {
      symbol: "V",
      sound: "v",
      name: "V",
      words: ["_v_owel"],
    },
    {
      symbol: "W",
      sound: "w / hw",
      name: "W",
      words: ["_w_ater", "_wh_at"],
    },
    {
      symbol: "Y",
      sound: "j / y",
      name: "J or Y",
      words: ["_y_ou"],
    },
    {
      symbol: "YO͞O",
      sound: "yoo",
      name: "Long U",
      words: ["_you_", "_u_biquitous"],
    },
    {
      symbol: "Z",
      sound: "z",
      name: "Z",
      words: ["sci_ss_or_s_", "_xy_lophone"],
    },
  ];
</script>

<template>
  <DocumentDisplay>
    <p v-for="(list, i) in words" :key="i" class="list">
      <span class="header word">
        <span class="symbol">{{ list.symbol }}</span>
        <span class="sound">{{ list.sound }}</span>
        <span class="name">{{ list.name }}</span>
      </span>

      <span
        v-for="(word, j) in list.words"
        :key="j"
        class="word"
        v-html="
          word.replace(
            /_[^_]+_/g,
            (highlight) =>
              `<span class='highlight'>${highlight.slice(1, -1)}</span>`
          )
        "
      />
    </p>
  </DocumentDisplay>
</template>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin: 0.5em 0;
    padding-bottom: 0.5em;
    font-size: 1.5em;
    border-bottom: 0.0625em solid var(--border-color);
  }

  .header {
    padding: 0 0.25em;
    background-color: var(--field-background);
    border-radius: 0.25em;

    & > :not(:last-child) {
      margin-right: 0.25em;
      padding-right: 0.25em;
      border-right: 1px solid var(--border-color);
    }
  }

  .word:not(.header) {
    padding: 0 0.125em 0 0.25em;
    letter-spacing: 0.125em;
    background-color: var(--field-background);
    border-radius: 0.25em;

    :deep() .highlight {
      margin-right: 0.125em;
      padding: 0.25em 0.125em 0.25em 0.25em;
      background-color: var(--field-strong-background);
      border-radius: 0.25em;
    }
  }
</style>
