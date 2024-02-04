#include "asm.h"

uint8_t rotl8(uint8_t chr, int c) {
    c %= 8;
    if (c == 0)
        return chr;
    uint8_t mask = 0x80;
    uint8_t mem;
    for (int i = 1;i < c;i++) {
        mask |= (0x80 >> i);
    }
    mem = (chr & mask);
    chr <<= c;
    chr |= mem;
    return chr;
}
uint8_t rotr8(uint8_t chr, int c) {
    c %= 8;
    if (c == 0)
        return chr;
    uint8_t mask = 1;
    uint8_t mem;
    for (int i = 1;i < c;i++) {
        mask |= (i << 0x01);
    }
    mem = (chr & mask);
    mem <<= (8 - c);
    chr >>= c;
    chr |= mem;
    return chr;
}