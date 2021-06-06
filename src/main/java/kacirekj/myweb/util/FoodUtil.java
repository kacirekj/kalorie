package kacirekj.myweb.util;

import java.text.Normalizer;
import java.util.Locale;

public class FoodUtil {
    public static String normalizeFoodName(String name) {
        String s = name;
        s = Normalizer.normalize(s, Normalizer.Form.NFD);
        s = s.toLowerCase(Locale.ROOT);
        s = s.replaceAll("[^\\p{ASCII}]", "");
        s = s.replaceAll("\\s{1,}", "-");
        return s;
    }
}
