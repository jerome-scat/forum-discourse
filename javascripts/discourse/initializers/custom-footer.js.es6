import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "cockpitlab-custom-footer",

  initialize() {
    withPluginApi("0.8.7", (api) => {
      api.decorateWidget("site-footer:after", (helper) => {
        return helper.h(
          "div#cockpitlab-footer.custom-footer-wrapper",
          helper.h("p.custom-footer-text", [
            "© 2015–2025 CockpitLAB. Imaginé et Développé avec ❤️ par ",
            helper.h("span.signature", "Jérôme SCAT"),
            " · ",
            helper.h(
              "a.footer-contact-link",
              { href: "/u/jerome/messages" },
              "Contact"
            ),
          ])
        );
      });
    });
  },
};
