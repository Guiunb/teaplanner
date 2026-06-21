// --- Line 1500 ---


// --- Line 1501 ---
/* AI ASSISTANT IN HEADER */

// --- Line 1502 ---
.ai-assistant-container {

// --- Line 1503 ---
position: relative;

// --- Line 1504 ---
z-index: 995;

// --- Line 1505 ---
display: flex;

// --- Line 1506 ---
flex-direction: column;

// --- Line 1507 ---
flex-grow: 1;

// --- Line 1508 ---
min-width: 280px;

// --- Line 1509 ---
max-width: 450px;

// --- Line 1510 ---
margin: 2px 0;

// --- Line 1511 ---
}

// --- Line 1512 ---


// --- Line 1513 ---
.ai-prompt-bar {

// --- Line 1514 ---
background: rgba(0, 0, 0, 0.25);

// --- Line 1515 ---
border: 1px solid rgba(25, 118, 210, 0.3);

// --- Line 1516 ---
border-radius: 20px;

// --- Line 1517 ---
padding: 2px 8px;

// --- Line 1518 ---
display: flex;

// --- Line 1519 ---
align-items: center;

// --- Line 1520 ---
gap: 6px;

// --- Line 1521 ---
height: 34px;

// --- Line 1522 ---
box-sizing: border-box;

// --- Line 1523 ---
transition: border-color 0.3s, box-shadow 0.3s;

// --- Line 1524 ---
}

// --- Line 1525 ---


// --- Line 1526 ---
.ai-prompt-bar:focus-within {

// --- Line 1527 ---
border-color: rgba(25, 118, 210, 0.8);

// --- Line 1528 ---
box-shadow: 0 0 10px rgba(25, 118, 210, 0.25);

// --- Line 1529 ---
}

// --- Line 1530 ---


// --- Line 1531 ---
.ai-input {

// --- Line 1532 ---
flex: 1;

// --- Line 1533 ---
background: transparent;

// --- Line 1534 ---
border: none;

// --- Line 1535 ---
color: #fff;

// --- Line 1536 ---
padding: 4px 0;

// --- Line 1537 ---
font-size: 14px;

// --- Line 1538 ---
outline: none;

// --- Line 1539 ---
min-width: 0;

// --- Line 1542 ---
.ai-input::placeholder {

// --- Line 1543 ---
color: rgba(255, 255, 255, 0.55);

// --- Line 1544 ---
}

// --- Line 1546 ---
.ai-btn {

// --- Line 1547 ---
background: transparent;

// --- Line 1548 ---
border: none;

// --- Line 1549 ---
color: #9fb3d2;

// --- Line 1550 ---
cursor: pointer;

// --- Line 1551 ---
padding: 0;

// --- Line 1552 ---
display: flex;

// --- Line 1553 ---
align-items: center;

// --- Line 1554 ---
justify-content: center;

// --- Line 1555 ---
transition: background 0.2s, color 0.2s;

// --- Line 1556 ---
outline: none;

// --- Line 1557 ---
width: 26px;

// --- Line 1558 ---
height: 26px;

// --- Line 1559 ---
border-radius: 50%;

// --- Line 1560 ---
font-size: 13px;

// --- Line 1561 ---
}

// --- Line 1562 ---


// --- Line 1563 ---
.ai-btn:hover {

// --- Line 1564 ---
background: rgba(255, 255, 255, 0.1);

// --- Line 1565 ---
color: #fff;

// --- Line 1568 ---
.ai-btn.active {

// --- Line 1569 ---
color: #ffd54f;

// --- Line 1570 ---
}

// --- Line 1571 ---


// --- Line 1572 ---
.ai-mic-btn.recording {

// --- Line 1573 ---
background: rgba(239, 83, 80, 0.3);

// --- Line 1574 ---
color: #ef5350;

// --- Line 1575 ---
animation: pulseMic 1.5s infinite;

// --- Line 1576 ---
}

// --- Line 1577 ---


// --- Line 1578 ---
.ai-send-btn {

// --- Line 1579 ---
background: rgba(255, 255, 255, 0.15);

// --- Line 1580 ---
border: 1px solid rgba(255, 255, 255, 0.15);

// --- Line 1581 ---
color: #fff;

// --- Line 1582 ---
transition: background-color 0.2s, border-color 0.2s;

// --- Line 1585 ---
.ai-send-btn:hover {

// --- Line 1586 ---
background: rgba(255, 255, 255, 0.25);

// --- Line 1587 ---
border-color: rgba(255, 255, 255, 0.3);

// --- Line 1588 ---
}

// --- Line 1589 ---


// --- Line 1590 ---
.ai-response-bubble {

// --- Line 1594 ---
right: 0;

// --- Line 1595 ---
margin-top: 6px;

// --- Line 1596 ---
background: var(--panel);

// --- Line 1597 ---
border: 1px solid rgba(255, 255, 255, 0.08);

// --- Line 1599 ---
padding: 10px 12px;

// --- Line 1600 ---
color: var(--ink);

// --- Line 1601 ---
font-size: 13px;

// --- Line 1602 ---
box-shadow: 0 10px 30px rgba(0, 0, 0, .4);

// --- Line 1603 ---
display: none;

// --- Line 1604 ---
max-height: 200px;

// --- Line 1605 ---
overflow-y: auto;

// --- Line 1606 ---
z-index: 1001;

// --- Line 1607 ---
animation: fadeInAI 0.2s ease-out;

// --- Line 1608 ---
}

// --- Line 1609 ---


// --- Line 1610 ---
.ai-response-bubble.active {

// --- Line 1611 ---
display: block;

// --- Line 1612 ---
}

// --- Line 1613 ---


// --- Line 1614 ---
.ai-response-bubble .ai-explanation {

// --- Line 1615 ---
font-weight: 500;

// --- Line 1616 ---
color: #64b5f6;

// --- Line 1617 ---
margin-bottom: 4px;

// --- Line 1618 ---
}

// --- Line 1619 ---


// --- Line 1620 ---
.ai-response-bubble .ai-question {

// --- Line 1621 ---
font-weight: 600;

// --- Line 1622 ---
color: #ffd54f;

// --- Line 1623 ---
margin-top: 4px;

// --- Line 1624 ---
}

// --- Line 1625 ---


// --- Line 1626 ---
.ai-response-bubble .ai-error {

// --- Line 1627 ---
color: #ff8a80;

// --- Line 1628 ---
font-weight: 500;

// --- Line 1629 ---
}

// --- Line 1630 ---


// --- Line 1631 ---
/* Soundwave animation for mic recording */

// --- Line 1632 ---
.ai-soundwave {

// --- Line 1633 ---
display: none;

// --- Line 1634 ---
align-items: center;

// --- Line 1635 ---
gap: 2px;

// --- Line 1636 ---
height: 14px;

// --- Line 1637 ---
padding: 0 4px;

// --- Line 1638 ---
}

// --- Line 1639 ---


// --- Line 1640 ---
.ai-soundwave.active {

// --- Line 1641 ---
display: flex;

// --- Line 1642 ---
}

// --- Line 1643 ---


// --- Line 1644 ---
.ai-soundwave span {

// --- Line 1645 ---
display: block;

// --- Line 1646 ---
width: 2px;

// --- Line 1647 ---
height: 6px;

// --- Line 1648 ---
background: #ef5350;

// --- Line 1649 ---
border-radius: 2px;

// --- Line 1650 ---
animation: waveBounce 1.2s infinite ease-in-out;

// --- Line 1651 ---
}

// --- Line 1652 ---


// --- Line 1653 ---
.ai-soundwave span:nth-child(2) { animation-delay: 0.2s; height: 10px; }

// --- Line 1654 ---
.ai-soundwave span:nth-child(3) { animation-delay: 0.4s; height: 8px; }

// --- Line 1655 ---
.ai-soundwave span:nth-child(4) { animation-delay: 0.6s; height: 4px; }

// --- Line 1656 ---


// --- Line 1657 ---
@keyframes fadeInAI {

// --- Line 1658 ---
from { opacity: 0; transform: translateY(5px); }

// --- Line 1659 ---
to { opacity: 1; transform: translateY(0); }

// --- Line 1660 ---
}

// --- Line 1661 ---


// --- Line 1662 ---
@keyframes pulseMic {

// --- Line 1663 ---
0% { box-shadow: 0 0 0 0 rgba(239, 83, 80, 0.5); }

// --- Line 1664 ---
70% { box-shadow: 0 0 0 10px rgba(239, 83, 80, 0); }

// --- Line 1665 ---
100% { box-shadow: 0 0 0 0 rgba(239, 83, 80, 0); }

// --- Line 1666 ---
}

// --- Line 1668 ---
@keyframes waveBounce {

// --- Line 1669 ---
0%, 100% { transform: scaleY(1); }

// --- Line 1670 ---
50% { transform: scaleY(2); }

// --- Line 1671 ---
}

// --- Line 1672 ---


// --- Line 1673 ---
/* Styling for Header Dropdowns */

// --- Line 1674 ---
.header-dropdown {

// --- Line 1675 ---
position: relative;

// --- Line 1676 ---
display: inline-block;

// --- Line 1677 ---
}

// --- Line 1678 ---


// --- Line 1679 ---
.header-dropdown-btn {

// --- Line 1680 ---
background: rgba(255, 255, 255, 0.15);

// --- Line 1681 ---
color: #fff;

// --- Line 1682 ---
border: 1px solid rgba(255, 255, 255, 0.15);

// --- Line 1683 ---
border-radius: 8px;

// --- Line 1684 ---
padding: 6px 12px;

// --- Line 1685 ---
font-weight: bold;

// --- Line 1686 ---
cursor: pointer;

// --- Line 1687 ---
display: flex;

// --- Line 1688 ---
align-items: center;

// --- Line 1689 ---
gap: 6px;

// --- Line 1690 ---
font-size: 13px;

// --- Line 1691 ---
transition: background-color 0.2s, border-color 0.2s;

// --- Line 1692 ---
height: 28px;

// --- Line 1693 ---
line-height: 1;

// --- Line 1694 ---
}

// --- Line 1695 ---


// --- Line 1696 ---
.header-dropdown-btn:hover {

// --- Line 1697 ---
background: rgba(255, 255, 255, 0.25);

// --- Line 1698 ---
border-color: rgba(255, 255, 255, 0.3);

// --- Line 1699 ---
}

// --- Line 1700 ---


// --- Line 1701 ---
.header-dropdown-content {

// --- Line 1702 ---
display: none;

// --- Line 1703 ---
position: absolute;

// --- Line 1704 ---
top: 100%;

// --- Line 1705 ---
left: 0;

// --- Line 1706 ---
background: color-mix(in srgb, var(--panel) 92%, #000);

// --- Line 1707 ---
backdrop-filter: blur(12px);

// --- Line 1708 ---
-webkit-backdrop-filter: blur(12px);

// --- Line 1709 ---
min-width: 185px;

// --- Line 1710 ---
box-shadow: 0px 10px 30px rgba(0,0,0,0.6);

// --- Line 1711 ---
z-index: 1000;

// --- Line 1712 ---
border-radius: 10px;

// --- Line 1713 ---
overflow: hidden;

// --- Line 1714 ---
border: 1px solid rgba(255, 255, 255, 0.1);

// --- Line 1715 ---
margin-top: 6px;

// --- Line 1716 ---
animation: dropdownSlideIn 0.2s ease-out;

// --- Line 1717 ---
}

// --- Line 1718 ---


// --- Line 1719 ---
@keyframes dropdownSlideIn {

// --- Line 1720 ---
from {

// --- Line 1721 ---
opacity: 0;

// --- Line 1722 ---
transform: translateY(-8px);

// --- Line 1723 ---
}

// --- Line 1724 ---
to {

// --- Line 1725 ---
opacity: 1;

// --- Line 1726 ---
transform: translateY(0);

// --- Line 1727 ---
}

// --- Line 1728 ---
}

// --- Line 1729 ---


// --- Line 1730 ---
/* High specificity overrides to completely strip default header button styles */

// --- Line 1731 ---
header.app .header-dropdown-content button {

// --- Line 1732 ---
color: var(--ink) !important;

// --- Line 1733 ---
padding: 10px 14px !important;

// --- Line 1734 ---
text-decoration: none !important;

// --- Line 1735 ---
display: flex !important;

// --- Line 1736 ---
align-items: center !important;

// --- Line 1737 ---
width: 100% !important;

// --- Line 1738 ---
text-align: left !important;

// --- Line 1739 ---
background: transparent !important;

// --- Line 1740 ---
border: none !important;

// --- Line 1741 ---
border-radius: 0 !important;

// --- Line 1742 ---
font-size: 13px !important;

// --- Line 1743 ---
font-weight: 500 !important;

// --- Line 1744 ---
line-height: inherit !important;

// --- Line 1745 ---
height: auto !important;

// --- Line 1746 ---
transition: background-color 0.2s, padding-left 0.2s, color 0.2s !important;

// --- Line 1747 ---
cursor: pointer !important;

// --- Line 1748 ---
}

// --- Line 1749 ---


// --- Line 1750 ---
header.app .header-dropdown-content button:hover {

// --- Line 1751 ---
background-color: rgba(255, 255, 255, 0.08) !important;

// --- Line 1752 ---
border-color: transparent !important;

// --- Line 1753 ---
padding-left: 20px !important;

// --- Line 1754 ---
color: #fff !important;

// --- Line 1755 ---
}

// --- Line 1756 ---


// --- Line 1757 ---
header.app .header-dropdown-content button#menuDeleteBoard {

// --- Line 1758 ---
color: #ff6b6b !important;

// --- Line 1759 ---
}

// --- Line 1760 ---


// --- Line 1761 ---
header.app .header-dropdown-content button#menuDeleteBoard:hover {

// --- Line 1762 ---
background-color: rgba(255, 107, 107, 0.15) !important;

// --- Line 1763 ---
color: #ff8e8e !important;

// --- Line 1764 ---
}

// --- Line 1765 ---


// --- Line 1766 ---
.header-dropdown.active .header-dropdown-content {

// --- Line 1767 ---
display: block;

// --- Line 1768 ---
}

// --- Line 1769 ---


// --- Line 1770 ---
.weekly-add-btn {

// --- Line 1771 ---
background: transparent;

// --- Line 1772 ---
border: none;

// --- Line 1773 ---
color: var(--brand);

// --- Line 1774 ---
font-size: 18px;

// --- Line 1775 ---
font-weight: bold;

// --- Line 1776 ---
cursor: pointer;

// --- Line 1777 ---
padding: 0 6px;

// --- Line 1778 ---
border-radius: 4px;

// --- Line 1779 ---
line-height: 1;

// --- Line 1780 ---
transition: background-color 0.2s, color 0.2s;

// --- Line 1781 ---
display: flex;

// --- Line 1782 ---
align-items: center;

// --- Line 1783 ---
justify-content: center;

// --- Line 1784 ---
}

// --- Line 1785 ---


// --- Line 1786 ---
.weekly-add-btn:hover {

// --- Line 1787 ---
background-color: rgba(255, 255, 255, 0.1);

// --- Line 1788 ---
color: #fff;

// --- Line 1789 ---
}

// --- Line 1790 ---


// --- Line 1791 ---
/* Premium Switch / Toggle Switch Style */

// --- Line 1792 ---
.premium-switch-container {

// --- Line 1793 ---
display: flex;

// --- Line 1794 ---
align-items: center;

// --- Line 1795 ---
justify-content: space-between;

// --- Line 1796 ---
padding: 10px 12px;

// --- Line 1797 ---
background: var(--bg);

// --- Line 1798 ---
border: 1px solid rgba(255, 255, 255, 0.15);

// --- Line 1799 ---
border-radius: 8px;

// --- Line 1800 ---
margin-bottom: 12px;

// --- Line 1801 ---
}

// --- Line 1802 ---
.premium-switch-label {

// --- Line 1803 ---
font-size: 14px;

// --- Line 1804 ---
font-weight: 500;

// --- Line 1805 ---
color: #fff;

// --- Line 1806 ---
}

// --- Line 1807 ---
.premium-switch {

// --- Line 1808 ---
position: relative;

// --- Line 1809 ---
display: inline-block;

// --- Line 1810 ---
width: 46px;

// --- Line 1811 ---
height: 26px;

// --- Line 1812 ---
}

// --- Line 1813 ---
.premium-switch input {

// --- Line 1814 ---
opacity: 0;

// --- Line 1815 ---
width: 0;

// --- Line 1816 ---
height: 0;

// --- Line 1817 ---
}

// --- Line 1818 ---
.premium-slider {

// --- Line 1819 ---
position: absolute;

// --- Line 1820 ---
cursor: pointer;

// --- Line 1821 ---
top: 0; left: 0; right: 0; bottom: 0;

// --- Line 1822 ---
background-color: rgba(255, 255, 255, 0.15);

// --- Line 1823 ---
transition: .3s;

// --- Line 1824 ---
border-radius: 26px;

// --- Line 1825 ---
border: 1px solid #37474f;

// --- Line 1826 ---
}

// --- Line 1827 ---
.premium-slider:before {

// --- Line 1828 ---
position: absolute;

// --- Line 1829 ---
content: "";

// --- Line 1830 ---
height: 18px;

// --- Line 1831 ---
width: 18px;

// --- Line 1832 ---
left: 3px;

// --- Line 1833 ---
bottom: 3px;

// --- Line 1834 ---
background-color: #fff;

// --- Line 1835 ---
transition: .3s;

// --- Line 1836 ---
border-radius: 50%;

// --- Line 1837 ---
box-shadow: 0 2px 4px rgba(0,0,0,0.3);

// --- Line 1838 ---
}

// --- Line 1839 ---
input:checked + .premium-slider {

// --- Line 1840 ---
background-color: var(--brand);

// --- Line 1841 ---
border-color: var(--brand);

// --- Line 1842 ---
}

// --- Line 1843 ---
input:checked + .premium-slider:before {

// --- Line 1844 ---
transform: translateX(20px);

// --- Line 1845 ---
}

// --- Line 1847 ---
/* Alert dialog option items */

// --- Line 1848 ---
.alert-option-item {

// --- Line 1849 ---
display: flex;

// --- Line 1850 ---
align-items: center;

// --- Line 1851 ---
justify-content: space-between;

// --- Line 1852 ---
padding: 12px 14px;

// --- Line 1853 ---
background: var(--bg);

// --- Line 1854 ---
border: 1px solid rgba(255, 255, 255, 0.15);

// --- Line 1855 ---
border-radius: 8px;

// --- Line 1856 ---
margin-bottom: 8px;

// --- Line 1857 ---
cursor: pointer;

// --- Line 1858 ---
transition: background 0.2s, border-color 0.2s;

// --- Line 1859 ---
user-select: none;

// --- Line 1860 ---
font-size: 14px;

// --- Line 1861 ---
}

// --- Line 1862 ---
.alert-option-item:hover {

// --- Line 1863 ---
background: #16243f;

// --- Line 1864 ---
border-color: #2e3f5d;

// --- Line 1865 ---
}

// --- Line 1866 ---
.alert-option-item.selected {

// --- Line 1867 ---
background: color-mix(in srgb, var(--brand) 15%, var(--panel));

// --- Line 1868 ---
border-color: var(--brand);

// --- Line 1869 ---
}

// --- Line 1870 ---
.alert-option-item .check-mark {

// --- Line 1871 ---
color: var(--brand);

// --- Line 1872 ---
font-weight: bold;

// --- Line 1873 ---
font-size: 15px;

// --- Line 1874 ---
display: none;

// --- Line 1875 ---
}

// --- Line 1876 ---
.alert-option-item.selected .check-mark {

// --- Line 1877 ---
display: block;

// --- Line 1878 ---
}

// --- Line 1879 ---


// --- Line 1880 ---
/* Weekday circles */

// --- Line 1881 ---
.weekday-btn {

// --- Line 1882 ---
width: 32px;

// --- Line 1883 ---
height: 32px;

// --- Line 1884 ---
border-radius: 50%;

// --- Line 1885 ---
border: 1px solid rgba(255, 255, 255, 0.15);

// --- Line 1886 ---
background: transparent;

// --- Line 1887 ---
color: #fff;

// --- Line 1888 ---
cursor: pointer;

// --- Line 1889 ---
font-size: 13px;

// --- Line 1890 ---
font-weight: bold;

// --- Line 1891 ---
display: flex;

// --- Line 1892 ---
align-items: center;

// --- Line 1893 ---
justify-content: center;

// --- Line 1894 ---
transition: background 0.2s, border-color 0.2s, transform 0.1s;

// --- Line 1895 ---
outline: none;

// --- Line 1896 ---
}

// --- Line 1897 ---
.weekday-btn:hover {

// --- Line 1898 ---
background: rgba(255,255,255,0.05);

// --- Line 1899 ---
}

// --- Line 1900 ---
.weekday-btn.selected {

// --- Line 1901 ---
background: var(--brand);

// --- Line 1902 ---
border-color: var(--brand);

// --- Line 1903 ---
}

// --- Line 1904 ---
.weekday-btn:active {

// --- Line 1905 ---
transform: scale(0.9);

// --- Line 1906 ---
}

// --- Line 1907 ---


// --- Line 1908 ---
/* ANALOG TIME PICKER STYLES */

// --- Line 1909 ---
.analog-time-picker-backdrop {

// --- Line 1910 ---
position: fixed;

// --- Line 1911 ---
top: 0; left: 0; right: 0; bottom: 0;

// --- Line 1912 ---
background: rgba(0, 0, 0, 0.7);

// --- Line 1913 ---
display: flex;

// --- Line 1914 ---
align-items: center;

// --- Line 1915 ---
justify-content: center;

// --- Line 1916 ---
z-index: 15000;

// --- Line 1917 ---
font-family: system-ui, -apple-system, sans-serif;

// --- Line 1918 ---
}

// --- Line 1919 ---
.analog-time-picker-modal {

// --- Line 1920 ---
background: #192638;

// --- Line 1921 ---
border: 1px solid #283e5a;

// --- Line 1922 ---
border-radius: 16px;

// --- Line 1923 ---
width: 310px;

// --- Line 1924 ---
padding: 16px;

// --- Line 1925 ---
display: flex;

// --- Line 1926 ---
flex-direction: column;

// --- Line 1927 ---
align-items: center;

// --- Line 1928 ---
box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);

// --- Line 1929 ---
user-select: none;

// --- Line 1930 ---
}

// --- Line 1931 ---
.analog-time-picker-title {

// --- Line 1932 ---
color: #9fb3d2;

// --- Line 1933 ---
font-size: 13px;

// --- Line 1934 ---
margin-bottom: 12px;

// --- Line 1935 ---
align-self: flex-start;

// --- Line 1936 ---
font-weight: 500;

// --- Line 1937 ---
}

// --- Line 1938 ---
.analog-time-picker-display {

// --- Line 1939 ---
display: flex;

// --- Line 1940 ---
align-items: center;

// --- Line 1941 ---
justify-content: center;

// --- Line 1942 ---
gap: 6px;

// --- Line 1943 ---
margin-bottom: 16px;

// --- Line 1944 ---
}

// --- Line 1945 ---
.analog-time-picker-display input {

// --- Line 1946 ---
width: 68px;

// --- Line 1947 ---
height: 58px;

// --- Line 1948 ---
background: #0f1c2c;

// --- Line 1949 ---
border: 1px solid #243c5b;

// --- Line 1950 ---
border-radius: 8px;

// --- Line 1951 ---
color: #9fb3d2;

// --- Line 1952 ---
font-size: 36px;

// --- Line 1953 ---
font-weight: bold;

// --- Line 1954 ---
text-align: center;

// --- Line 1955 ---
outline: none;

// --- Line 1956 ---
padding: 0;

// --- Line 1957 ---
transition: all 0.2s;

// --- Line 1958 ---
cursor: pointer;

// --- Line 1959 ---
}

// --- Line 1960 ---
.analog-time-picker-display input.active {

// --- Line 1961 ---
background: var(--brand);

// --- Line 1962 ---
color: #fff;

// --- Line 1963 ---
border-color: var(--brand);

// --- Line 1964 ---
}

// --- Line 1965 ---
.analog-time-picker-display span {

// --- Line 1966 ---
color: #fff;

// --- Line 1967 ---
font-size: 28px;

// --- Line 1968 ---
font-weight: bold;

// --- Line 1969 ---
}

// --- Line 1970 ---
.analog-time-picker-face-container {

// --- Line 1971 ---
position: relative;

// --- Line 1972 ---
width: 230px;

// --- Line 1973 ---
height: 230px;

// --- Line 1974 ---
background: #0b1726;

// --- Line 1975 ---
border-radius: 50%;

// --- Line 1976 ---
margin-bottom: 16px;

// --- Line 1977 ---
touch-action: none;

// --- Line 1978 ---
}

// --- Line 1979 ---
.analog-time-picker-number {

// --- Line 1980 ---
position: absolute;

// --- Line 1981 ---
width: 28px;

// --- Line 1982 ---
height: 28px;

// --- Line 1983 ---
line-height: 28px;

// --- Line 1984 ---
text-align: center;

// --- Line 1985 ---
font-size: 13px;

// --- Line 1986 ---
font-weight: bold;

// --- Line 1987 ---
color: #9fb3d2;

// --- Line 1988 ---
border-radius: 50%;

// --- Line 1989 ---
pointer-events: none;

// --- Line 1990 ---
z-index: 2;

// --- Line 1991 ---
transition: color 0.1s;

// --- Line 1992 ---
}

// --- Line 1993 ---
.analog-time-picker-number.selected {

// --- Line 1994 ---
color: #fff;

// --- Line 1995 ---
}

// --- Line 1996 ---
.analog-time-picker-svg {

// --- Line 1997 ---
position: absolute;

// --- Line 1998 ---
top: 0; left: 0;

// --- Line 1999 ---
width: 230px;

// --- Line 2000 ---
height: 230px;

// --- Line 2001 ---
pointer-events: none;

// --- Line 2002 ---
z-index: 1;

// --- Line 2003 ---
}

// --- Line 2004 ---
.analog-time-picker-keyboard-input-msg {

// --- Line 2005 ---
color: #9fb3d2;

// --- Line 2006 ---
font-size: 13px;

// --- Line 2007 ---
margin: 40px 0;

// --- Line 2008 ---
text-align: center;

// --- Line 2009 ---
}

// --- Line 2010 ---
.analog-time-picker-footer {

// --- Line 2011 ---
display: flex;

// --- Line 2012 ---
width: 100%;

// --- Line 2013 ---
justify-content: space-between;

// --- Line 2014 ---
align-items: center;

// --- Line 2015 ---
margin-top: 10px;

// --- Line 2016 ---
}

// --- Line 2017 ---
.analog-time-picker-keyboard-btn {

// --- Line 2018 ---
background: transparent;

// --- Line 2019 ---
border: none;

// --- Line 2020 ---
color: #9fb3d2;

// --- Line 2021 ---
font-size: 20px;

// --- Line 2022 ---
cursor: pointer;

// --- Line 2023 ---
padding: 8px;

// --- Line 2024 ---
border-radius: 50%;

// --- Line 2025 ---
display: flex;

// --- Line 2026 ---
align-items: center;

// --- Line 2027 ---
justify-content: center;

// --- Line 2028 ---
transition: background 0.2s;

// --- Line 2029 ---
}

// --- Line 2030 ---
.analog-time-picker-keyboard-btn:hover {

// --- Line 2031 ---
background: rgba(255, 255, 255, 0.05);

// --- Line 2032 ---
}

// --- Line 2033 ---
.analog-time-picker-buttons {

// --- Line 2034 ---
display: flex;

// --- Line 2035 ---
gap: 10px;

// --- Line 2036 ---
}

// --- Line 2037 ---
.analog-time-picker-buttons button {

// --- Line 2038 ---
background: transparent;

// --- Line 2039 ---
border: none;

// --- Line 2040 ---
color: #ffd54f;

// --- Line 2041 ---
font-weight: bold;

// --- Line 2042 ---
font-size: 14px;

// --- Line 2043 ---
cursor: pointer;

// --- Line 2044 ---
padding: 8px 12px;

// --- Line 2045 ---
border-radius: 6px;

// --- Line 2046 ---
text-transform: uppercase;

// --- Line 2047 ---
transition: background 0.2s;

// --- Line 2048 ---
}

// --- Line 2049 ---
.analog-time-picker-buttons button:hover {

// --- Line 2050 ---
background: rgba(255, 213, 79, 0.1);

// --- Line 2051 ---
}

// --- Line 2052 ---


// --- Line 2053 ---
/* CHECKLIST FILTERS STYLES */

// --- Line 2054 ---
.filter-checkbox-list {

// --- Line 2055 ---
display: flex;

// --- Line 2056 ---
flex-direction: column;

// --- Line 2057 ---
gap: 8px;

// --- Line 2058 ---
max-height: 250px;

// --- Line 2059 ---
overflow-y: auto;

// --- Line 2060 ---
padding: 6px 2px;

// --- Line 2061 ---
}

// --- Line 2062 ---
</style>

// --- Line 2063 ---
</head>

// --- Line 2064 ---


// --- Line 2065 ---
<body>

// --- Line 2066 ---
<header class="app" id="appHeader">

// --- Line 2067 ---
<h1>

// --- Line 2068 ---
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"

// --- Line 2069 ---
stroke-linejoin="round" class="header-icon">

// --- Line 2070 ---
<path

// --- Line 2071 ---
d="M17.32 10c.88.88 1.39 2.07 1.39 3.32 0 2.65-2.15 4.8-4.8 
       4.8s-4.8-2.15-4.8-4.8c0-1.25.51-2.44 1.39-3.32">

// --- Line 2072 ---
</path>

// --- Line 2073 ---
<path d="M12 18.12V22"></path>

// --- Line 2074 ---
<path

// --- Line 2075 ---
d="M12 2a9.99 9.99 0 0 1 8.61 14.61A9.99 9.99 0 0 1 12 22a9.99 9.99 0 0 1-8.61-5.39A9.99 
       9.99 0 0 1 12 2z">

// --- Line 2076 ---
</path>

// --- Line 2077 ---
</svg>

// --- Line 2078 ---
TEA PLANNER

// --- Line 2079 ---
</h1>

// --- Line 2080 ---
<button id="loginBtn" style="background:#4285F4; color:white;">Login Google</button>

// --- Line 2081 ---
<span id="userInfo" style="font-size:12px; font-weight:bold;"></span>

// --- Line 2082 ---


// --- Line 2083 ---
<!-- BOARD CONTROLS -->

// --- Line 2084 ---
<div class="board-controls"

// --- Line 2085 ---
style="display: flex; gap: 8px; align-items: center; background: rgba(0,0,0,0.2); padding: 4px 8px; 
       border-radius: 8px; margin-right: auto; flex-wrap: wrap;">

// --- Line 2086 ---
<select id="boardSelect"

// --- Line 2087 ---
style="background: rgba(255, 255, 255, 0.12); color: white; border: 1px solid rgba(255, 255, 
       255, 0.15); padding: 4px 8px; border-radius: 8px; max-width: 200px; cursor: pointer; font-weight: bold;">

// --- Line 2088 ---
<!-- Options populated by JS -->

// --- Line 2089 ---
</select>

// --- Line 2090 ---


// --- Line 2091 ---
<div class="header-dropdown" id="boardDropdownContainer">

// --- Line 2092 ---
<button class="header-dropdown-btn" type="button">Quadros ?</button>

// --- Line 2093 ---
<div class="header-dropdown-content">

// --- Line 2094 ---
<button type="button" id="menuNewBoard">Adicionar Quadro</button>

// --- Line 2095 ---
<button type="button" id="menuRenameBoard">Renomear Quadro</button>

// --- Line 2096 ---
<button type="button" id="menuCloneBoard">Salvar Quadro como...</button>

// --- Line 2097 ---
<button type="button" id="menuBoardTheme">Cor do Quadro</button>

// --- Line 2098 ---
<button type="button" id="menuDeleteBoard" style="color: #ff6b6b;">Excluir Quadro</button>

// --- Line 2099 ---
</div>

// --- Line 2100 ---
</div>

// --- Line 2101 ---


// --- Line 2102 ---
<div class="header-dropdown" id="dataDropdownContainer">

// --- Line 2103 ---
<button class="header-dropdown-btn" type="button">Dados ?</button>

// --- Line 2104 ---
<div class="header-dropdown-content">

// --- Line 2105 ---
<button type="button" id="menuExportJson">Salvar Json</button>

// --- Line 2106 ---
<button type="button" id="menuImportJson">Importar Json</button>

// --- Line 2107 ---
</div>

// --- Line 2108 ---
</div>

// --- Line 2109 ---
<div style="width: 1px; height: 20px; background: rgba(255,255,255,0.2); margin: 0 4px; display: 
       none;"></div>

// --- Line 2110 ---
<!-- Ocultos para manter compatibilidade de IDs legados -->

// --- Line 2111 ---
<button id="newBoardBtn" style="display:none"></button>

// --- Line 2112 ---
<button id="editBoardBtn" style="display:none"></button>

// --- Line 2113 ---
<button id="cloneBoardBtn" style="display:none"></button>

// --- Line 2114 ---
<button id="boardThemeBtn" style="display:none"></button>

// --- Line 2115 ---
<button id="deleteBoardBtn" style="display:none"></button>

// --- Line 2116 ---
</div>

// --- Line 2117 ---


// --- Line 2118 ---
<button id="undo" title="Desfazer (Ctrl+Z)">?</button>

// --- Line 2119 ---
<button id="redo" title="Refazer (Ctrl+Shift+Z)">?</button>

// --- Line 2120 ---
<button id="toggleSelectionModeBtn" title="Ativar/Desativar modo de sele��o m�ltipla">??? 
       Multi-sele��o</button>

// --- Line 2121 ---
<button id="filterColorsBtn" title="Filtrar por cor">Filtro de cor</button>

// --- Line 2122 ---
<button id="clearFilters">Limpar filtros</button>

// --- Line 2123 ---
<button id="filterBoardsBtn" title="Filtrar quadros exibidos no TODOS" style="display: none;">Filtrar 
       Quadros</button>

// --- Line 2124 ---
<span id="filtersOn" class="badge" hidden>Filtros ativos</span>

// --- Line 2125 ---
<input id="fTime" name="fTime" type="text" placeholder="Tempo (ex: 45m)" style="width:120px"

// --- Line 2126 ---
title="Filtra cart�es com tempo definido menor ou igual ao valor. Use 'm' para minutos, 'h' para 
       horas. Ex: 90m or 1h 30m">

// --- Line 2127 ---
<strong id="sumTimersDisplay" title="Selecionado: 0:00 / Filtrado: 0:00 / Total: 0:00">0:00 min</strong>

// --- Line 2128 ---
<label>De <input id="fFrom" name="fFrom" type="date"></label>

// --- Line 2129 ---
<label>At� <input id="fTo" name="fTo" type="date"></label>

// --- Line 2130 ---


// --- Line 2131 ---
<button id="toggleBoardBtn" title="Mostrar/Ocultar Kanban">?</button>

// --- Line 2132 ---
<button id="toggleMatrixBtn" title="Mostrar/Ocultar Matriz">?</button>

// --- Line 2133 ---
<button id="toggleAgendaBtn" title="Mostrar/Ocultar Agenda">???</button>

// --- Line 2134 ---
<button id="toggleWeeklyBtn" title="Vis�o Semanal">?? Semana</button>

// --- Line 2135 ---
<button id="manualFocusBtn" title="Minimizar para Timer" style="background: rgba(102, 187, 106, 0.2); 
       border-color: rgba(102, 187, 106, 0.4);">?? Foco</button>

// --- Line 2136 ---


// --- Line 2137 ---
<button id="quickSaveBtn" style="display:none"></button>

// --- Line 2138 ---
<label class="toggle-switch" title="Configura��o R�pida: Ao criar um cart�o, abrir pop-ups de timer e 
       cor.">

// --- Line 2139 ---
<input type="checkbox" id="quickConfigToggle" name="quickConfigToggle" class="toggle-switch-input">

// --- Line 2140 ---
<span class="toggle-switch-label">??</span>

// --- Line 2141 ---
<span class="toggle-switch-button">OFF</span>

// --- Line 2142 ---
</label>

// --- Line 2143 ---
<button id="addList">+ Lista</button>

// --- Line 2144 ---
<!-- AI Assistant Header Bar -->

// --- Line 2145 ---
<div class="ai-assistant-container" id="aiAssistantContainer">

// --- Line 2146 ---
<div class="ai-prompt-bar">

// --- Line 2147 ---
<button class="ai-btn" id="aiConfigBtn" title="Configurar IA (Gemini, ChatGPT, 
       Claude...)">??</button>

// --- Line 2148 ---
<div class="ai-soundwave" id="aiSoundwave">

// --- Line 2149 ---
<span></span><span></span><span></span><span></span>

// --- Line 2150 ---
</div>

// --- Line 2151 ---
<input type="text" class="ai-input" id="aiInput" name="aiInput" placeholder="Fale ou digite um 
       comando..." autocomplete="off">

// --- Line 2152 ---
<button class="ai-btn ai-mic-btn" id="aiMicBtn" title="Falar comando 
       (Android/Chrome)">???</button>

// --- Line 2153 ---
<button class="ai-btn ai-send-btn" id="aiSendBtn" title="Enviar comando">?</button>

// --- Line 2154 ---
</div>

// --- Line 2155 ---
<div class="ai-response-bubble" id="aiResponseBubble"></div>

// --- Line 2156 ---
</div>

// --- Line 2157 ---
<!-- Ocultos para manter compatibilidade de IDs legados -->

// --- Line 2158 ---
<button id="exportJson" style="display:none"></button>

// --- Line 2159 ---
<button id="importJsonBtn" style="display:none"></button>

// --- Line 2160 ---
<input id="importFile" name="importFile" type="file" style="display:none" />

// --- Line 2161 ---
<button id="reset" style="display:none"></button>

// --- Line 2162 ---
</header>

// --- Line 2163 ---
<section class="workspace">

// --- Line 2164 ---
<div id="main-content">

// --- Line 2165 ---
<div class="weekly-container collapsed" id="weekly-container">

// --- Line 2166 ---
<div class="weekly-controls">

// --- Line 2167 ---
<button id="prevWeekBtn" title="Semana Anterior">?</button>

// --- Line 2168 ---
<button id="todayWeekBtn" style="padding: 2px 8px; border-radius: 6px; font-size: 12px; 
       height: 26px; cursor: pointer; background: rgba(255,255,255,0.15); color: #fff; border: 1px solid 
       rgba(255,255,255,0.15);">Hoje</button>

// --- Line 2169 ---
<span id="weekRangeDisplay">Semana Atual</span>

// --- Line 2170 ---
<button id="nextWeekBtn" title="Pr�xima Semana">?</button>

// --- Line 2171 ---
</div>

// --- Line 2172 ---
<div class="weekly-grid" id="weeklyGrid">

// --- Line 2173 ---
<!-- Colunas geradas via JS -->

// --- Line 2174 ---
</div>

// --- Line 2175 ---
</div>

// --- Line 2176 ---
<div class="resizer resizer-h" id="resizer-weekly"></div>

// --- Line 2177 ---
<div class="board-container" id="board-container">

// --- Line 2178 ---
<main class="board" id="board"></main>

// --- Line 2179 ---
</div>

// --- Line 2180 ---
<div class="resizer resizer-h" id="resizer-matrix"></div>

// --- Line 2181 ---
<div class="matrix-container" id="matrix-container">

// --- Line 2182 ---
<section class="matrix" id="matrix"></section>

// --- Line 2183 ---
</div>

// --- Line 2184 ---
</div>

// --- Line 2185 ---
<div class="resizer resizer-v" id="resizer-sidebar"></div>

// --- Line 2186 ---
<aside id="agenda-sidebar">

// --- Line 2187 ---
<div class="schedule" id="schedule">

// --- Line 2188 ---
<header>

// --- Line 2189 ---
<div class="header-row">

// --- Line 2190 ---
<strong>AGENDA</strong>

// --- Line 2191 ---
<div class="copy-paste-buttons">

// --- Line 2192 ---
<button id="addUnscheduledBtn" title="Novo Evento (A definir)">+</button>

// --- Line 2193 ---
<button id="copyDayBtn" title="Copiar dia atual">??</button>

// --- Line 2194 ---
<button id="pasteDayBtn" title="Colar dia copiado">??</button>

// --- Line 2195 ---
</div>

// --- Line 2196 ---
</div>

// --- Line 2197 ---
<div class="header-row">

// --- Line 2198 ---
<div class="date-nav">

// --- Line 2199 ---
<button id="prevDayBtn" title="Dia Anterior">&lt;</button>

// --- Line 2200 ---
<button id="todayDayBtn" style="font-size: 12px; padding: 4px 8px; cursor: pointer; 
       background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; 
       margin-right: 4px;">Hoje</button>

// --- Line 2201 ---
<input id="agendaDate" name="agendaDate" type="date" />

// --- Line 2202 ---
<button id="nextDayBtn" title="Pr�ximo Dia">&gt;</button>

// --- Line 2203 ---
</div>

// --- Line 2204 ---
</div>

// --- Line 2205 ---
</header>

// --- Line 2206 ---
<div id="slots"></div>

// --- Line 2207 ---
</div>

// --- Line 2208 ---
</aside>

// --- Line 2209 ---
</section>

// --- Line 2210 ---


// --- Line 2211 ---
<div id="ctx" class="ctx">

// --- Line 2212 ---
<button data-action="edit">?? Editar Cart�o <span class="shortcut">F2</span></button>

// --- Line 2213 ---
<button data-action="select-mode">??? Selecionar Cart�o</button>

// --- Line 2214 ---
<div class="sep"></div>

// --- Line 2215 ---
<button data-action="timer">?? Timer <span class="shortcut">Alt+T</span></button>

// --- Line 2216 ---
<button data-action="color">?? Editar cor <span class="shortcut">Alt+C</span></button>

// --- Line 2217 ---
<button data-action="date">?? Editar Data <span class="shortcut">Alt+D</span></button>

// --- Line 2218 ---
<button data-action="agenda">?? Agendar / Recorr�ncia...</button>

// --- Line 2219 ---
<button data-action="alert">?? Configurar Alerta...</button>

// --- Line 2220 ---
<div class="sep"></div>

// --- Line 2221 ---
<div id="ctx-move-board" style="position:relative">

// --- Line 2222 ---
<button data-action="move-board">?? Mover para Quadro ?</button>

// --- Line 2223 ---
<div class="ctx-sub" id="ctx-move-board-sub"></div>

// --- Line 2224 ---
</div>

// --- Line 2225 ---
<div class="sep"></div>

// --- Line 2226 ---
<button data-action="prop">?? Propriedades do Cart�o</button>

// --- Line 2227 ---
<button data-action="gemini-subtasks">? Gerar subtarefas</button>

// --- Line 2228 ---
<button data-action="gemini-organize">? Organizar na Matriz</button>

// --- Line 2229 ---
<div class="sep"></div>

// --- Line 2230 ---
<button data-action="dup">? Duplicar <span class="shortcut">Ctrl+D</span></button>

// --- Line 2231 ---
<button data-action="del">??? Excluir <span class="shortcut">Del</span></button>

// --- Line 2232 ---
<div id="ctx-move" style="position:relative">

// --- Line 2233 ---
<button data-action="move">?? Mover para ?</button>

// --- Line 2234 ---
<div class="ctx-sub" id="ctx-move-sub"></div>

// --- Line 2235 ---
</div>

// --- Line 2236 ---
<div id="ctx-move-all" style="position:relative; display:none;">

// --- Line 2237 ---
<button data-action="move-all">?? Mover TODOS desta Lista ?</button>

// --- Line 2238 ---
<div class="ctx-sub" id="ctx-moveall-sub"></div>

// --- Line 2239 ---
</div>

// --- Line 2240 ---
<button data-action="del-all" style="display:none;">??? Excluir TODOS desta Lista</button>

// --- Line 2241 ---
</div>

// --- Line 2242 ---


// --- Line 2243 ---
<div id="ctx-list" class="ctx">

// --- Line 2244 ---
<button data-action="list-del">??? Excluir lista</button>

// --- Line 2245 ---
<button data-action="list-del-all">??? Excluir TODOS desta Lista</button>

// --- Line 2246 ---
<button data-action="list-move-all">?? Mover TODOS desta Lista ?</button>

// --- Line 2247 ---
<div class="ctx-sub" id="ctx-list-move-sub"></div>

// --- Line 2248 ---
<button data-action="list-move-board">?? Mover LISTA para outro quadro ?</button>

// --- Line 2249 ---
<div class="ctx-sub" id="ctx-list-move-board-sub"></div>

// --- Line 2250 ---
</div>

// --- Line 2251 ---


// --- Line 2252 ---
<div id="focus-overlay">

// --- Line 2253 ---
<div class="focus-card-clone">

// --- Line 2254 ---
<div id="focusTargetText">Carregando tarefa...</div>

// --- Line 2255 ---
<div class="focus-time" id="focusTargetTime">00:00</div>

// --- Line 2256 ---
<div class="focus-controls">

// --- Line 2257 ---
<button id="focusMinusBtn" title="-1 minuto">?</button>

// --- Line 2258 ---
<button id="focusToggleBtn" title="Pausar/Retomar">??</button>

// --- Line 2259 ---
<button id="focusPlusBtn" title="+1 minuto">?</button>

// --- Line 2260 ---
<button id="focusCloseBtn" title="Sair do Modo Foco">?</button>

// --- Line 2261 ---
</div>

// --- Line 2262 ---
</div>

// --- Line 2263 ---
</div>

// --- Line 2264 ---


// --- Line 2265 ---
<!-- Marquee Selection Box -->

// --- Line 2266 ---
<div id="marquee"></div>

// --- Line 2267 ---


// --- Line 2268 ---


// --- Line 2269 ---


// --- Line 2270 ---
<script>

// --- Line 2271 ---
// Aguarda a janela carregar completamente antes de rodar o script

// --- Line 2272 ---
window.addEventListener('load', function () {

// --- Line 2273 ---


// --- Line 2274 ---
// ===== Firebase Configuration =====

// --- Line 2275 ---
const firebaseConfig = {

// --- Line 2276 ---
apiKey: "AIzaSyCk2BJMJPgLCWcjkcGs2n-MU8-2b44nnOs",

// --- Line 2277 ---
authDomain: "tea-planner-2.firebaseapp.com",

// --- Line 2278 ---
databaseURL: "https://tea-planner-2-default-rtdb.firebaseio.com",

// --- Line 2279 ---
projectId: "tea-planner-2",

// --- Line 2280 ---
storageBucket: "tea-planner-2.firebasestorage.app",

// --- Line 2281 ---
messagingSenderId: "933112271146",

// --- Line 2282 ---
appId: "1:933112271146:web:1fee83c401b14f2b774e53"

// --- Line 2283 ---
};

// --- Line 2284 ---


// --- Line 2285 ---
let app, auth, db;

// --- Line 2286 ---
let isFirebaseReady = false;

// --- Line 2287 ---
let currentUser = null;

// --- Line 2288 ---
let isRemoteUpdate = false;

// --- Line 2289 ---
let currentBoardRef = null;

// --- Line 2290 ---
let globalAgendaRef = null; // Nova refer�ncia para agenda global

// --- Line 2291 ---


// --- Line 2292 ---
// Inicializa Firebase

// --- Line 2293 ---
try {

// --- Line 2294 ---
if (typeof firebase !== 'undefined' && firebaseConfig.apiKey) {

// --- Line 2295 ---
app = firebase.initializeApp(firebaseConfig);

// --- Line 2296 ---
auth = firebase.auth();

// --- Line 2297 ---
db = firebase.database();

// --- Line 2298 ---
isFirebaseReady = true;

// --- Line 2299 ---
console.log("Firebase initialized successfully.");

// --- Line 2300 ---


// --- Line 2301 ---
auth.onAuthStateChanged(user => {

// --- Line 2302 ---
currentUser = user;

// --- Line 2303 ---
const loginBtn = document.getElementById('loginBtn');

// --- Line 2304 ---
const userInfo = document.getElementById('userInfo');

// --- Line 2305 ---


// --- Line 2306 ---
if (user) {

// --- Line 2307 ---
loginBtn.textContent = 'Sair';

// --- Line 2308 ---
loginBtn.removeAttribute('style');

// --- Line 2309 ---
userInfo.textContent = `Ol�, ${user.displayName || user.email}`;

// --- Line 2310 ---
setupFirebaseSync(user);

// --- Line 2311 ---
} else {

// --- Line 2312 ---
loginBtn.textContent = 'Login Google';

// --- Line 2313 ---
loginBtn.style.background = '#4285F4';

// --- Line 2314 ---
loginBtn.style.color = 'white';

// --- Line 2315 ---
loginBtn.style.borderColor = 'transparent';

// --- Line 2316 ---
userInfo.textContent = '';

// --- Line 2317 ---
if (currentBoardRef) currentBoardRef.off();

// --- Line 2318 ---
if (globalAgendaRef) globalAgendaRef.off();

// --- Line 2319 ---
}

// --- Line 2320 ---
});

// --- Line 2321 ---


// --- Line 2322 ---
const loginBtnEl = document.getElementById('loginBtn');

// --- Line 2323 ---
if (loginBtnEl) {

// --- Line 2324 ---
loginBtnEl.addEventListener('click', () => {

// --- Line 2325 ---
if (currentUser) {

// --- Line 2326 ---
auth.signOut();

// --- Line 2327 ---
window.location.reload();

// --- Line 2328 ---
} else {

// --- Line 2329 ---
const provider = new firebase.auth.GoogleAuthProvider();

// --- Line 2330 ---
auth.signInWithPopup(provider).catch(error => {

// --- Line 2331 ---
console.error("Erro no popup, tentando redirect...", error);

// --- Line 2332 ---
auth.signInWithRedirect(provider);

// --- Line 2333 ---
});

// --- Line 2334 ---
}

// --- Line 2335 ---
});

// --- Line 2336 ---
}

// --- Line 2337 ---


// --- Line 2338 ---
} else {

// --- Line 2339 ---
console.warn("Offline mode or Firebase script not loaded.");

// --- Line 2340 ---
}

// --- Line 2341 ---
} catch (e) {

// --- Line 2342 ---
console.error("Error initializing Firebase:", e);

// --- Line 2343 ---
}

// --- Line 2345 ---
function registerFirebaseListeners(user) {

// --- Line 2346 ---
// 1. Sincronizar METADADOS (Lista de Quadros)

// --- Line 2347 ---
const metaRef = db.ref('users/' + user.uid + '/meta');

// --- Line 2348 ---
metaRef.on('value', (snapshot) => {

// --- Line 2349 ---
let val = snapshot.val();

// --- Line 2350 ---
if (val && !Array.isArray(val)) {

// --- Line 2351 ---
val = Object.keys(val).map(k => val[k]);

// --- Line 2352 ---
}

// --- Line 2353 ---


// --- Line 2354 ---
if (!snapshot.exists() || !val || val.length === 0) {

// --- Line 2355 ---
const localMetaStr = localStorage.getItem(LS_BOARDS_META);

// --- Line 2356 ---
if (localMetaStr) {

// --- Line 2357 ---
try {

// --- Line 2358 ---
const localMeta = JSON.parse(localMetaStr);

// --- Line 2359 ---
if (localMeta && localMeta.length > 0) {

// --- Line 2360 ---
console.log("Sync: Firebase meta n�o existe, enviando metadados locais...");

// --- Line 2361 ---
metaRef.set(localMeta);

// --- Line 2362 ---
return;

// --- Line 2363 ---
}

// --- Line 2364 ---
} catch (e) {

// --- Line 2365 ---
console.error("Erro ao ler metadados locais na sincroniza��o:", e);

// --- Line 2367 ---
}

// --- Line 2368 ---
}

// --- Line 2369 ---


// --- Line 2370 ---
if (val && Array.isArray(val)) {

// --- Line 2371 ---
let updated = false;

// --- Line 2372 ---
if (!val.some(b => b.id === 'board-todos')) {

// --- Line 2373 ---
val.unshift({ id: 'board-todos', name: 'TODOS ??', lastModified: Date.now(), color: 
       '#1976d2' });

// --- Line 2374 ---
updated = true;

// --- Line 2375 ---
}

// --- Line 2376 ---
if (!val.some(b => b.id === 'board-trash')) {

// --- Line 2377 ---
val.push({ id: 'board-trash', name: 'Lixeira ???', lastModified: Date.now(), color: 
       '#5a1419' });

// --- Line 2378 ---
updated = true;

// --- Line 2380 ---


// --- Line 2381 ---
// Reconcile board IDs by matching board names

// --- Line 2382 ---
reconcileBoardIds(val);

// --- Line 2383 ---


// --- Line 2384 ---
if (JSON.stringify(val) !== JSON.stringify(boardsMeta)) {

// --- Line 2385 ---
console.log("Sync: Nova lista de quadros recebida.");

// --- Line 2386 ---
boardsMeta = val;

// --- Line 2387 ---
localStorage.setItem(LS_BOARDS_META, JSON.stringify(boardsMeta));

// --- Line 2388 ---
visibleBoardsInTodos = null;

// --- Line 2389 ---
updateBoardSelectUI();

// --- Line 2390 ---
if (updated) {

// --- Line 2391 ---
saveBoardsMetadata(true);

// --- Line 2392 ---
}

// --- Line 2393 ---
if (!boardsMeta.find(b => b.id === currentBoardId)) {

// --- Line 2394 ---
if (boardsMeta.length > 0) switchBoard(boardsMeta[0].id);

// --- Line 2395 ---
else createNewBoard('Meu Quadro');

// --- Line 2396 ---
}

// --- Line 2397 ---
}

// --- Line 2398 ---
}

// --- Line 2399 ---
});

// --- Line 2400 ---


// --- Line 2401 ---
// 2. Sincronizar AGENDA GLOBAL (Sempre ativa)

// --- Line 2402 ---
subscribeToGlobalAgenda(user.uid);

// --- Line 2403 ---


// --- Line 2404 ---
// 3. Sincronizar o QUADRO ATUAL

// --- Line 2405 ---
subscribeToCurrentBoard(user.uid, currentBoardId);

// --- Line 2406 ---
}

// --- Line 2407 ---


// --- Line 2408 ---
function setupFirebaseSync(user) {

// --- Line 2409 ---
// For�ar upload do backup para o Firebase se foi restaurado localmente

// --- Line 2410 ---
const forceSync = localStorage.getItem('tea-planner-force-cloud-sync') === 'true';

// --- Line 2411 ---
if (forceSync) {

// --- Line 2412 ---
console.log("Sync: For�ando upload do backup local para o Firebase...");

// --- Line 2413 ---
localStorage.removeItem('tea-planner-force-cloud-sync');

// --- Line 2414 ---
try {

// --- Line 2415 ---
const localMetaStr = localStorage.getItem(LS_BOARDS_META);

// --- Line 2416 ---
const localAgendaStr = localStorage.getItem(LS_GLOBAL_AGENDA);

// --- Line 2417 ---


// --- Line 2418 ---
const promises = [];

// --- Line 2419 ---
if (localMetaStr) promises.push(db.ref('users/' + user.uid + 
       '/meta').set(JSON.parse(localMetaStr)));

// --- Line 2420 ---
if (localAgendaStr) promises.push(db.ref('users/' + user.uid + 
       '/global/agenda').set(JSON.parse(localAgendaStr)));

// --- Line 2421 ---


// --- Line 2422 ---
// Envia cada quadro

// --- Line 2423 ---
const localMeta = localMetaStr ? JSON.parse(localMetaStr) : [];

// --- Line 2424 ---
localMeta.forEach(b => {

// --- Line 2425 ---
const bStr = localStorage.getItem(LS_BOARD_PREFIX + b.id);

// --- Line 2426 ---
if (bStr) {

// --- Line 2427 ---
promises.push(db.ref('users/' + user.uid + '/boards/' + 
       b.id).set(JSON.parse(bStr)));

// --- Line 2428 ---
}

// --- Line 2429 ---
});

// --- Line 2430 ---


// --- Line 2431 ---
Promise.all(promises)

// --- Line 2432 ---
.then(() => {

// --- Line 2433 ---
console.log("Sync: Upload do backup conclu�do com sucesso. Ativando escutas do 
       Firebase...");

// --- Line 2434 ---
registerFirebaseListeners(user);

// --- Line 2435 ---
loadAndRenderAll();

// --- Line 2436 ---
})

// --- Line 2437 ---
.catch(err => {

// --- Line 2438 ---
console.error("Erro ao sincronizar backup com o Firebase:", err);

// --- Line 2439 ---
registerFirebaseListeners(user);

// --- Line 2440 ---
loadAndRenderAll();

// --- Line 2441 ---
});

// --- Line 2442 ---
} catch (e) {

// --- Line 2443 ---
console.error("Erro no upload do backup para o Firebase:", e);

// --- Line 2444 ---
registerFirebaseListeners(user);

// --- Line 2445 ---
}

// --- Line 2446 ---
} else {

// --- Line 2447 ---
registerFirebaseListeners(user);

// --- Line 2448 ---
}

// --- Line 2449 ---
}

// --- Line 2450 ---


// --- Line 2451 ---
function subscribeToGlobalAgenda(uid) {

// --- Line 2452 ---
if (!isFirebaseReady || !uid) return;

// --- Line 2453 ---
if (globalAgendaRef) globalAgendaRef.off();

// --- Line 2454 ---


// --- Line 2455 ---
console.log("Sync: Escutando Agenda Global...");

// --- Line 2456 ---
globalAgendaRef = db.ref('users/' + uid + '/global/agenda');

// --- Line 2457 ---


// --- Line 2458 ---
globalAgendaRef.on('value', (snapshot) => {

// --- Line 2459 ---
let val = snapshot.val();

// --- Line 2460 ---
if (val && !Array.isArray(val)) {

// --- Line 2461 ---
val = Object.keys(val).map(k => val[k]);

// --- Line 2462 ---
}

// --- Line 2463 ---


// --- Line 2464 ---
if (!snapshot.exists()) {

// --- Line 2465 ---
const localAgendaStr = localStorage.getItem(LS_GLOBAL_AGENDA);

// --- Line 2466 ---
if (localAgendaStr && localAgendaStr !== '[]' && localAgendaStr !== '') {

// --- Line 2467 ---
console.log("Sync: Firebase agenda global n�o existe, enviando local...");

// --- Line 2468 ---
try {

// --- Line 2469 ---
globalAgendaRef.set(JSON.parse(localAgendaStr));

// --- Line 2470 ---
return;

// --- Line 2471 ---
} catch (e) {

// --- Line 2472 ---
console.error("Erro ao fazer parse da agenda local para enviar:", e);

// --- Line 2473 ---
}

// --- Line 2474 ---
}

// --- Line 2475 ---
}

// --- Line 2476 ---


// --- Line 2477 ---
if (!val) val = []; // Agenda vazia

// --- Line 2478 ---


// --- Line 2479 ---
const currentLocal = localStorage.getItem(LS_GLOBAL_AGENDA);

// --- Line 2480 ---
const remoteIsEmpty = !val || (Array.isArray(val) && val.length === 0) || (typeof val === 
       'object' && Object.keys(val).length === 0);

// --- Line 2481 ---


// --- Line 2482 ---
if (remoteIsEmpty && currentLocal && currentLocal !== '[]' && currentLocal !== '') {

// --- Line 2483 ---
try {

// --- Line 2484 ---
const localAgendaData = JSON.parse(currentLocal);

// --- Line 2485 ---
if (Array.isArray(localAgendaData) && localAgendaData.length > 0) {

// --- Line 2486 ---
console.warn("Sync: Agenda global remota vazia, mas local populada. Protegendo 
       dados locais e enviando para o Firebase.");

// --- Line 2487 ---
globalAgendaRef.set(localAgendaData);

// --- Line 2488 ---
return;

// --- Line 2489 ---
}

// --- Line 2490 ---
} catch (e) {

// --- Line 2491 ---
console.error("Erro ao fazer parse da agenda global local para prote��o de dados:", 
       e);

// --- Line 2492 ---
}

// --- Line 2493 ---
}

// --- Line 2494 ---


// --- Line 2495 ---
const valStr = JSON.stringify(val);

// --- Line 2496 ---


// --- Line 2497 ---
if (valStr === currentLocal) return;

// --- Line 2498 ---


// --- Line 2499 ---
console.log("Sync: Agenda Global atualizada remotamente.");

// --- Line 2500 ---
isRemoteUpdate = true;

// --- Line 2501 ---
localStorage.setItem(LS_GLOBAL_AGENDA, valStr);

// --- Line 2502 ---


// --- Line 2503 ---
// Recarrega a tela mesclando (Board + Agenda Nova)

// --- Line 2504 ---
loadAndRenderAll();

// --- Line 2505 ---
isRemoteUpdate = false;

// --- Line 2506 ---
});

// --- Line 2507 ---
}

// --- Line 2508 ---


// --- Line 2509 ---
function subscribeToCurrentBoard(uid, boardId) {

// --- Line 2510 ---
if (!isFirebaseReady || !uid || !boardId) return;

// --- Line 2511 ---


// --- Line 2512 ---
if (currentBoardRef) currentBoardRef.off();

// --- Line 2513 ---


// --- Line 2514 ---
console.log(`Sync: Escutando altera��es no quadro ${boardId}...`);

// --- Line 2515 ---
currentBoardRef = db.ref('users/' + uid + '/boards/' + boardId);

// --- Line 2517 ---
currentBoardRef.on('value', (snapshot) => {

// --- Line 2518 ---
let val = snapshot.val();

// --- Line 2519 ---
if (val && !Array.isArray(val)) {

// --- Line 2520 ---
val = Object.keys(val).map(k => val[k]);

// --- Line 2521 ---
}

// --- Line 2522 ---


// --- Line 2523 ---
if (!snapshot.exists()) {

// --- Line 2524 ---
const localBoardStr = localStorage.getItem(LS_BOARD_PREFIX + boardId);

// --- Line 2525 ---
if (localBoardStr && localBoardStr !== '[]' && localBoardStr !== '') {

// --- Line 2526 ---
console.log(`Sync: Firebase board ${boardId} n�o existe, enviando local...`);

// --- Line 2527 ---
try {

// --- Line 2528 ---
currentBoardRef.set(JSON.parse(localBoardStr));

// --- Line 2529 ---
return;

// --- Line 2530 ---
} catch (e) {

// --- Line 2531 ---
console.error("Erro ao fazer parse do quadro local para enviar:", e);

// --- Line 2532 ---
}

// --- Line 2533 ---
}

// --- Line 2535 ---


// --- Line 2536 ---
if (!val) val = [];

// --- Line 2538 ---
const currentLocalData = localStorage.getItem(LS_BOARD_PREFIX + boardId);

// --- Line 2539 ---
const remoteIsEmpty = !val || (Array.isArray(val) && val.length === 0) || (typeof val === 
       'object' && Object.keys(val).length === 0);

// --- Line 2540 ---


// --- Line 2541 ---
if (remoteIsEmpty && currentLocalData && currentLocalData !== '[]' && currentLocalData !== 
       '') {

// --- Line 2542 ---
try {

// --- Line 2543 ---
const localBoardData = JSON.parse(currentLocalData);

// --- Line 2544 ---
if (Array.isArray(localBoardData) && localBoardData.length > 0) {

// --- Line 2545 ---
console.warn(`Sync: Quadro remoto ${boardId} vazio, mas local populado. 
       Protegendo dados locais e enviando para o Firebase.`);

// --- Line 2546 ---
currentBoardRef.set(localBoardData);

// --- Line 2547 ---
return;

// --- Line 2548 ---
}

// --- Line 2549 ---
} catch (e) {

// --- Line 2550 ---
console.error("Erro ao fazer parse do quadro local para prote��o de dados:", e);

// --- Line 2551 ---
}

// --- Line 2552 ---
}

// --- Line 2553 ---


// --- Line 2554 ---
const valStr = JSON.stringify(val);

// --- Line 2555 ---


// --- Line 2556 ---
if (valStr === currentLocalData) return;

// --- Line 2557 ---


// --- Line 2558 ---
console.log("Sync: Conte�do do quadro atualizado remotamente.");

// --- Line 2559 ---
isRemoteUpdate = true;

// --- Line 2560 ---
localStorage.setItem(LS_BOARD_PREFIX + boardId, valStr);

// --- Line 2561 ---


// --- Line 2562 ---
if (currentBoardId === boardId) {

// --- Line 2563 ---
loadAndRenderAll();

// --- Line 2564 ---
}

// --- Line 2565 ---
isRemoteUpdate = false;

// --- Line 2566 ---
});

// --- Line 2567 ---
}

// --- Line 2568 ---


// --- Line 2569 ---


// --- Line 2570 ---
// ===== Helpers =====

// --- Line 2571 ---
function normalizeBoardName(name) {

// --- Line 2572 ---
if (!name) return '';

// --- Line 2573 ---
return name.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]
       |[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '')

// --- Line 2574 ---
.replace(/[^a-zA-Z0-9\s]/g, '')

// --- Line 2575 ---
.toLowerCase()

// --- Line 2576 ---
.trim();

// --- Line 2577 ---
}

// --- Line 2578 ---


// --- Line 2579 ---
function reconcileBoardIds(remoteMeta) {

// --- Line 2580 ---
if (!Array.isArray(remoteMeta)) return;

// --- Line 2582 ---
let reconciledAny = false;

// --- Line 2583 ---


// --- Line 2584 ---
remoteMeta.forEach(remoteBoard => {

// --- Line 2585 ---
if (remoteBoard.id === 'board-todos' || remoteBoard.id === 'board-trash') return;

// --- Line 2586 ---


// --- Line 2587 ---
const remoteNorm = normalizeBoardName(remoteBoard.name);

// --- Line 2588 ---
if (!remoteNorm) return;

// --- Line 2589 ---


// --- Line 2590 ---
// Procura nos metadados locais (boardsMeta) se existe algum quadro com o mesmo nome mas ID 
       diferente

// --- Line 2591 ---
const localMatch = boardsMeta.find(b => 

// --- Line 2592 ---
b.id !== 'board-todos' && 

// --- Line 2593 ---
b.id !== 'board-trash' && 

// --- Line 2594 ---
b.id !== remoteBoard.id && 

// --- Line 2595 ---
normalizeBoardName(b.name) === remoteNorm

// --- Line 2596 ---
);

// --- Line 2597 ---


// --- Line 2598 ---
if (localMatch) {

// --- Line 2599 ---
const oldId = localMatch.id;

// --- Line 2600 ---
const newId = remoteBoard.id;

// --- Line 2601 ---


// --- Line 2602 ---
console.log(`Reconciliation: Mapeando quadro local "${localMatch.name}" (ID antigo: 
       ${oldId}) para ID remoto: ${newId}`);

// --- Line 2603 ---


// --- Line 2604 ---
// 1. Move os dados do quadro no localStorage e Firebase

// --- Line 2605 ---
const oldBoardKey = LS_BOARD_PREFIX + oldId;

// --- Line 2606 ---
const newBoardKey = LS_BOARD_PREFIX + newId;

// --- Line 2607 ---
let oldBoardDataStr = localStorage.getItem(oldBoardKey);

// --- Line 2608 ---


// --- Line 2609 ---
if (oldBoardDataStr) {

// --- Line 2610 ---
try {

// --- Line 2611 ---
let oldBoardData = JSON.parse(oldBoardDataStr);

// --- Line 2612 ---
if (Array.isArray(oldBoardData) && oldBoardData.length > 0) {

// --- Line 2613 ---
oldBoardData.forEach(list => {

// --- Line 2614 ---
if (list.cards) {

// --- Line 2615 ---
list.cards.forEach(c => {

// --- Line 2616 ---
c.boardId = newId;

// --- Line 2617 ---
});

// --- Line 2618 ---
}

// --- Line 2619 ---
list.boardId = newId;

// --- Line 2620 ---
});

// --- Line 2622 ---
localStorage.setItem(newBoardKey, JSON.stringify(oldBoardData));

// --- Line 2623 ---
localStorage.removeItem(oldBoardKey);

// --- Line 2624 ---


// --- Line 2625 ---
if (isFirebaseReady && auth && auth.currentUser) {

// --- Line 2626 ---
db.ref('users/' + auth.currentUser.uid + '/boards/' + 
       newId).set(oldBoardData)

// --- Line 2627 ---
.then(() => console.log(`Reconciliation: Re-uploaded board ${newId} 
       data to Firebase`))

// --- Line 2628 ---
.catch(e => console.error("Reconciliation upload error:", e));

// --- Line 2629 ---
}

// --- Line 2630 ---
console.log(`Reconciliation: Dados do quadro migrados com sucesso de 
       ${oldId} para ${newId}`);

// --- Line 2631 ---
}

// --- Line 2632 ---
} catch (e) {

// --- Line 2633 ---
console.error(`Erro ao migrar dados do quadro de ${oldId} para ${newId}:`, e);

// --- Line 2634 ---
}

// --- Line 2635 ---
}

// --- Line 2636 ---


// --- Line 2637 ---
// 2. Atualiza os boardId correspondentes na Agenda Global no localStorage e Firebase

// --- Line 2638 ---
let globalAgendaStr = localStorage.getItem(LS_GLOBAL_AGENDA);

// --- Line 2639 ---
if (globalAgendaStr) {

// --- Line 2640 ---
try {

// --- Line 2641 ---
let agendaData = JSON.parse(globalAgendaStr);

// --- Line 2642 ---
if (Array.isArray(agendaData)) {

// --- Line 2643 ---
let agendaUpdated = false;

// --- Line 2644 ---
agendaData.forEach(list => {

// --- Line 2645 ---
if (list.cards) {

// --- Line 2646 ---
list.cards.forEach(c => {

// --- Line 2647 ---
if (c.boardId === oldId) {

// --- Line 2648 ---
c.boardId = newId;

// --- Line 2649 ---
agendaUpdated = true;

// --- Line 2650 ---
}

// --- Line 2651 ---
});

// --- Line 2652 ---
}

// --- Line 2653 ---
});

// --- Line 2654 ---
if (agendaUpdated) {

// --- Line 2655 ---
localStorage.setItem(LS_GLOBAL_AGENDA, JSON.stringify(agendaData));

// --- Line 2656 ---
if (isFirebaseReady && auth && auth.currentUser) {

// --- Line 2657 ---
db.ref('users/' + auth.currentUser.uid + 
       '/global/agenda').set(agendaData)

// --- Line 2658 ---
.then(() => console.log("Reconciliation: Re-uploaded reconciled 
       global agenda to Firebase"))

// --- Line 2659 ---
.catch(e => console.error("Reconciliation agenda upload 
       error:", e));

// --- Line 2660 ---
}

// --- Line 2661 ---
console.log(`Reconciliation: boardId dos cart�es da agenda global 
       atualizados de ${oldId} para ${newId}`);

// --- Line 2662 ---
}

// --- Line 2663 ---
}

// --- Line 2664 ---
} catch (e) {

// --- Line 2665 ---
console.error("Erro ao atualizar agenda global na reconcilia��o:", e);

// --- Line 2666 ---
}

// --- Line 2667 ---
}

// --- Line 2668 ---


// --- Line 2669 ---
// 3. Se o ID que mudou era o ID ativo, atualiza o currentBoardId

// --- Line 2670 ---
if (currentBoardId === oldId) {

// --- Line 2671 ---
currentBoardId = newId;

// --- Line 2672 ---
localStorage.setItem(LS_CURRENT_BOARD, newId);

// --- Line 2673 ---
console.log(`Reconciliation: Quadro ativo alterado para ${newId}`);

// --- Line 2674 ---
if (isFirebaseReady && auth && auth.currentUser) {

// --- Line 2675 ---
subscribeToCurrentBoard(auth.currentUser.uid, newId);

// --- Line 2676 ---
}

// --- Line 2677 ---
}

// --- Line 2678 ---


// --- Line 2679 ---
reconciledAny = true;

// --- Line 2680 ---
}

// --- Line 2681 ---
});

// --- Line 2682 ---


// --- Line 2683 ---
if (reconciledAny) {

// --- Line 2684 ---
boardsMeta = remoteMeta;

// --- Line 2685 ---
localStorage.setItem(LS_BOARDS_META, JSON.stringify(boardsMeta));

// --- Line 2686 ---
visibleBoardsInTodos = null;

// --- Line 2687 ---
updateBoardSelectUI();

// --- Line 2688 ---
}

// --- Line 2689 ---
}

// --- Line 2690 ---


// --- Line 2691 ---
function el(t, c) { var n = document.createElement(t); if (c) n.className = c; return n; }

// --- Line 2692 ---
function $$(s, r) { if (!r) r = document; return Array.prototype.slice.call(r.querySelectorAll(s)); 
       }

// --- Line 2693 ---
function to2(n) { return (n < 10 ? '0' + n : '' + n); }

// --- Line 2694 ---
function formatSecondsToTime(totalSeconds) {

// --- Line 2695 ---
if (totalSeconds <= 0) return '0:00 min';

// --- Line 2696 ---
const hours = Math.floor(totalSeconds / 3600);

// --- Line 2697 ---
const minutes = Math.floor((totalSeconds % 3600) / 60);

// --- Line 2698 ---
return `${hours > 0 ? hours + ':' : ''}${to2(minutes)} min`;

// --- Line 2699 ---
}

// --- Line 2700 ---


// --- Line 2701 ---
// ===== CONFIG & STATE =====

// --- Line 2702 ---
var LS_KEY = 'mini-trello-restore';

// --- Line 2703 ---
var LS_LABELS_KEY = 'tea-planner-labels';

// --- Line 2704 ---
var LS_QUICK_CONFIG_KEY = 'tea-planner-quick-config';

// --- Line 2705 ---


// --- Line 2706 ---
// New Multi-Board Keys

// --- Line 2707 ---
var LS_BOARDS_META = 'tea-planner-boards-meta';

// --- Line 2708 ---
var LS_CURRENT_BOARD = 'tea-planner-current-board-id';

// --- Line 2709 ---
var LS_BOARD_PREFIX = 'tea-planner-board-';

// --- Line 2710 ---
var LS_GLOBAL_AGENDA = 'tea-planner-global-agenda'; // NOVA CHAVE PARA AGENDA UNIFICADA

// --- Line 2711 ---


// --- Line 2712 ---
var currentBoardId = null;

// --- Line 2713 ---
var boardsMeta = [];

// --- Line 2714 ---
var DEFAULT_THEME_COLOR = '#1976d2';

// --- Line 2715 ---


// --- Line 2716 ---
var __persistTick = null, __muteHistory = 0;

// --- Line 2717 ---
function withMute(fn) { __muteHistory++; try { return fn(); } finally { __muteHistory--; } }

// --- Line 2718 ---


// --- Line 2719 ---
// FUN��O DE �UDIO (Beep) para o Timer

// --- Line 2720 ---
function playBeep() {

// --- Line 2721 ---
try {

// --- Line 2722 ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// --- Line 2723 ---
const oscillator = audioCtx.createOscillator();

// --- Line 2724 ---
const gainNode = audioCtx.createGain();

// --- Line 2725 ---
oscillator.connect(gainNode);

// --- Line 2726 ---
gainNode.connect(audioCtx.destination);

// --- Line 2727 ---
oscillator.type = 'sine';

// --- Line 2728 ---
oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);

// --- Line 2729 ---
gainNode.gain.setValueAtTime(0, audioCtx.currentTime);

// --- Line 2730 ---
gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);

// --- Line 2731 ---
gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);

// --- Line 2732 ---
oscillator.start(audioCtx.currentTime);

// --- Line 2733 ---
oscillator.stop(audioCtx.currentTime + 0.5);

// --- Line 2734 ---
} catch (e) { console.warn("�udio bloqueado", e); }

// --- Line 2735 ---
}

// --- Line 2736 ---


// --- Line 2737 ---
var boardEl = document.getElementById('board');

// --- Line 2738 ---
var schedule = document.getElementById('schedule');

// --- Line 2739 ---
var slotsRoot = document.getElementById('slots');

// --- Line 2740 ---
var matrixEl = document.getElementById('matrix');

// --- Line 2741 ---
var sumTimersDisplay = document.getElementById('sumTimersDisplay');

// --- Line 2742 ---
var allCards = [];

// --- Line 2743 ---
var globalTimerInterval = null;

// --- Line 2744 ---
var selected = new Set();

// --- Line 2745 ---
var isSelectionMode = false;

// --- Line 2746 ---
var lastMouseX = 0, lastMouseY = 0;

// --- Line 2747 ---
var agendaClipboard = [];

// --- Line 2748 ---
var appClipboard = []; // Para Copiar/Colar cart�es

// --- Line 2749 ---


// --- Line 2750 ---
// ===== Gemini API Integration =====

// --- Line 2751 ---
// DEFINIDAS AQUI EM CIMA PARA EVITAR ERRO DE REFERENCE ERROR

// --- Line 2752 ---
function showLoader(message) {

// --- Line 2753 ---
var existing = document.getElementById('loader-wrap');

// --- Line 2754 ---
if (existing) existing.remove();

// --- Line 2755 ---
var wrap = el('div', 'modal-wrap');

// --- Line 2756 ---
wrap.id = 'loader-wrap';

// --- Line 2757 ---
wrap.style.display = 'flex'; wrap.style.justifyContent = 'center'; wrap.style.alignItems = 
       'center';

// --- Line 2758 ---
var box = el('div', 'modal');

// --- Line 2759 ---
box.style.padding = '20px'; box.style.textAlign = 'center';

// --- Line 2760 ---
var spinner = el('div');

// --- Line 2761 ---
spinner.innerHTML = `<svg width="24" height="24" viewBox="0 0 24" 
       xmlns="http://www.w3.org/2000/svg"><g class="spinner_V8m1"><circle cx="12" cy="12" r="9.5" fill="none" 
       stroke="#fff" stroke-width="3"></circle></g></svg>`;

// --- Line 2762 ---
spinner.style.marginBottom = '12px';

// --- Line 2763 ---
var msgEl = el('div');

// --- Line 2764 ---
msgEl.textContent = message || 'Processando...';

// --- Line 2765 ---
box.appendChild(spinner); box.appendChild(msgEl);

// --- Line 2766 ---
wrap.appendChild(box);

// --- Line 2767 ---
document.body.appendChild(wrap);

// --- Line 2768 ---
}

// --- Line 2769 ---


// --- Line 2770 ---
function hideLoader() {

// --- Line 2771 ---
var wrap = document.getElementById('loader-wrap');

// --- Line 2772 ---
if (wrap) wrap.remove();

// --- Line 2773 ---
}

// --- Line 2774 ---


// --- Line 2775 ---
async function callAI(contentsOrPrompt, retries = 3, delay = 1000) {

// --- Line 2776 ---
const provider = localStorage.getItem('ai-provider') || 'gemini';

// --- Line 2777 ---


// --- Line 2778 ---
if (provider === 'gemini') {

// --- Line 2779 ---
const hardcodedKey = ""; // <--- INSIRA SUA API KEY AQUI

// --- Line 2780 ---
const apiKey = localStorage.getItem('gemini-api-key') || hardcodedKey;

// --- Line 2781 ---
if (!apiKey) {

// --- Line 2782 ---
alert("Chave API do Gemini n�o configurada. Por favor, clique na chave ?? na barra de 
       prompt para configur�-la.");

// --- Line 2783 ---
throw new Error("No API Key");

// --- Line 2784 ---
}

// --- Line 2785 ---


// --- Line 2786 ---
const modelSetting = localStorage.getItem('gemini-model') || 'auto';

// --- Line 2787 ---
const models = modelSetting === 'auto' ? ['gemini-1.5-flash', 'gemini-2.0-flash', 
       'gemini-2.5-flash', 'gemini-1.5-pro'] : [modelSetting];

// --- Line 2788 ---
let lastError = null;

// --- Line 2789 ---


// --- Line 2790 ---
for (const model of models) {

// --- Line 2791 ---
const apiUrl = 
       `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

// --- Line 2792 ---


// --- Line 2793 ---
let contents;

// --- Line 2794 ---
if (typeof contentsOrPrompt === 'string') {

// --- Line 2795 ---
contents = [{ parts: [{ text: contentsOrPrompt }] }];

// --- Line 2796 ---
} else {

// --- Line 2797 ---
contents = contentsOrPrompt;

// --- Line 2798 ---
}

// --- Line 2799 ---
const payload = { contents };

// --- Line 2800 ---


// --- Line 2801 ---
let currentDelay = delay;

// --- Line 2802 ---
let is404 = false;

// --- Line 2803 ---


// --- Line 2804 ---
for (let i = 0; i < retries; i++) {

// --- Line 2805 ---
try {

// --- Line 2806 ---
const response = await fetch(apiUrl, {

// --- Line 2807 ---
method: 'POST',

// --- Line 2808 ---
headers: { 'Content-Type': 'application/json' },

// --- Line 2809 ---
body: JSON.stringify(payload)

// --- Line 2810 ---
});

// --- Line 2811 ---


// --- Line 2812 ---
if (response.status === 404) {

// --- Line 2813 ---
console.warn(`Modelo ${model} indispon�vel (404). Tentando pr�ximo modelo 
       da lista...`);

// --- Line 2814 ---
is404 = true;

// --- Line 2815 ---
break;

// --- Line 2816 ---
}

// --- Line 2817 ---


// --- Line 2818 ---
if (!response.ok) {

// --- Line 2819 ---
let errorMsg = `HTTP error! status: ${response.status}`;

// --- Line 2820 ---
try {

// --- Line 2821 ---
const errJson = await response.json();

// --- Line 2822 ---
if (errJson.error && errJson.error.message) {

// --- Line 2823 ---
errorMsg = errJson.error.message;

// --- Line 2824 ---
}

// --- Line 2825 ---
} catch (_) {}

// --- Line 2826 ---
throw new Error(errorMsg);

// --- Line 2827 ---
}

// --- Line 2828 ---
const result = await response.json();

// --- Line 2829 ---
const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

// --- Line 2830 ---
if (text) return text;

// --- Line 2831 ---
else throw new Error('Resposta da API inv�lida ou vazia.');

// --- Line 2832 ---
} catch (error) {

// --- Line 2833 ---
lastError = error;

// --- Line 2834 ---
if (i === retries - 1) {

// --- Line 2835 ---
console.error(`Erro final ao chamar o modelo ${model}:`, error);

// --- Line 2836 ---
} else {

// --- Line 2837 ---
await new Promise(res => setTimeout(res, currentDelay));

// --- Line 2838 ---
currentDelay *= 2;

// --- Line 2839 ---
}

// --- Line 2840 ---
}

// --- Line 2841 ---
}

// --- Line 2842 ---


// --- Line 2843 ---
if (!is404 && lastError) {

// --- Line 2844 ---
throw lastError;

// --- Line 2845 ---
}

// --- Line 2846 ---
}

// --- Line 2847 ---


// --- Line 2848 ---
throw lastError || new Error("Nenhum modelo da lista est� dispon�vel para esta chave API.");

// --- Line 2849 ---
} else if (provider === 'openai') {

// --- Line 2850 ---
const apiKey = localStorage.getItem('openai-api-key') || '';

// --- Line 2851 ---
if (!apiKey) {

// --- Line 2852 ---
alert("Chave API da OpenAI n�o configurada. Por favor, clique na chave ?? na barra de 
       prompt para configur�-la.");

// --- Line 2853 ---
throw new Error("No API Key");

// --- Line 2854 ---
}

// --- Line 2855 ---


// --- Line 2856 ---
const model = localStorage.getItem('openai-model') || 'gpt-4o-mini';

// --- Line 2857 ---
const customUrl = localStorage.getItem('openai-custom-url') || '';

// --- Line 2858 ---


// --- Line 2859 ---
let apiUrl = 'https://api.openai.com/v1/chat/completions';

// --- Line 2860 ---
if (customUrl) {

// --- Line 2861 ---
if (customUrl.includes('chat/completions')) {

// --- Line 2862 ---
apiUrl = customUrl;

// --- Line 2863 ---
} else {

// --- Line 2864 ---
apiUrl = customUrl.endsWith('/') ? customUrl + 'chat/completions' : customUrl + 
       '/chat/completions';

// --- Line 2865 ---
}

// --- Line 2866 ---
}

// --- Line 2867 ---


// --- Line 2868 ---
let messages = [];

// --- Line 2869 ---
if (typeof contentsOrPrompt === 'string') {

// --- Line 2870 ---
messages = [{ role: 'user', content: contentsOrPrompt }];

// --- Line 2871 ---
} else if (Array.isArray(contentsOrPrompt)) {

// --- Line 2872 ---
if (contentsOrPrompt.length > 0) {

// --- Line 2873 ---
const sysText = contentsOrPrompt[0].parts?.[0]?.text || "";

// --- Line 2874 ---
messages.push({ role: 'system', content: sysText });

// --- Line 2875 ---
for (let i = 1; i < contentsOrPrompt.length; i++) {

// --- Line 2876 ---
const turn = contentsOrPrompt[i];

// --- Line 2877 ---
const role = turn.role === 'model' ? 'assistant' : 'user';

// --- Line 2878 ---
const text = turn.parts?.[0]?.text || "";

// --- Line 2879 ---
messages.push({ role: role, content: text });

// --- Line 2880 ---
}

// --- Line 2881 ---
}

// --- Line 2882 ---
}

// --- Line 2883 ---


// --- Line 2884 ---
const payload = {

// --- Line 2885 ---
model: model,

// --- Line 2886 ---
messages: messages

// --- Line 2887 ---
};

// --- Line 2888 ---


// --- Line 2889 ---
let lastError = null;

// --- Line 2890 ---
let currentDelay = delay;

// --- Line 2891 ---


// --- Line 2892 ---
for (let i = 0; i < retries; i++) {

// --- Line 2893 ---
try {

// --- Line 2894 ---
const response = await fetch(apiUrl, {

// --- Line 2895 ---
method: 'POST',

// --- Line 2896 ---
headers: {

// --- Line 2897 ---
'Content-Type': 'application/json',

// --- Line 2898 ---
'Authorization': `Bearer ${apiKey}`

// --- Line 2899 ---
},

// --- Line 2900 ---
body: JSON.stringify(payload)

// --- Line 2901 ---
});

// --- Line 2902 ---


// --- Line 2903 ---
if (!response.ok) {

// --- Line 2904 ---
let errorMsg = `HTTP error! status: ${response.status}`;

// --- Line 2905 ---
try {

// --- Line 2906 ---
const errJson = await response.json();

// --- Line 2907 ---
if (errJson.error && errJson.error.message) {

// --- Line 2908 ---
errorMsg = errJson.error.message;

// --- Line 2909 ---
}

// --- Line 2910 ---
} catch (_) {}

// --- Line 2911 ---
throw new Error(errorMsg);

// --- Line 2912 ---
}

// --- Line 2913 ---
const result = await response.json();

// --- Line 2914 ---
const text = result.choices?.[0]?.message?.content;

// --- Line 2915 ---
if (text) return text;

// --- Line 2916 ---
else throw new Error('Resposta da API inv�lida ou vazia.');

// --- Line 2917 ---
} catch (error) {

// --- Line 2918 ---
lastError = error;

// --- Line 2919 ---
if (i === retries - 1) {

// --- Line 2920 ---
console.error(`Erro final ao chamar OpenAI (${model}):`, error);

// --- Line 2921 ---
} else {

// --- Line 2922 ---
await new Promise(res => setTimeout(res, currentDelay));

// --- Line 2923 ---
currentDelay *= 2;

// --- Line 2924 ---
}

// --- Line 2925 ---
}

// --- Line 2926 ---
}

// --- Line 2927 ---
throw lastError || new Error("Erro ao chamar a API da OpenAI.");

// --- Line 2928 ---
} else if (provider === 'anthropic') {

// --- Line 2929 ---
const apiKey = localStorage.getItem('anthropic-api-key') || '';

// --- Line 2930 ---
if (!apiKey) {

// --- Line 2931 ---
alert("Chave API da Anthropic n�o configurada. Por favor, clique na chave ?? na barra 
       de prompt para configur�-la.");

// --- Line 2932 ---
throw new Error("No API Key");

// --- Line 2933 ---
}

// --- Line 2934 ---


// --- Line 2935 ---
const model = localStorage.getItem('anthropic-model') || 'claude-3-5-sonnet-latest';

// --- Line 2936 ---
const customUrl = localStorage.getItem('anthropic-custom-url') || '';

// --- Line 2937 ---


// --- Line 2938 ---
let apiUrl = 'https://api.anthropic.com/v1/messages';

// --- Line 2939 ---
if (customUrl) {

// --- Line 2940 ---
if (customUrl.includes('v1/messages')) {

// --- Line 2941 ---
apiUrl = customUrl;

// --- Line 2942 ---
} else {

// --- Line 2943 ---
apiUrl = customUrl.endsWith('/') ? customUrl + 'v1/messages' : customUrl + 
       '/v1/messages';

// --- Line 2944 ---
}

// --- Line 2945 ---
}

// --- Line 2946 ---


// --- Line 2947 ---
let systemPrompt = "";

// --- Line 2948 ---
let messages = [];

// --- Line 2949 ---
if (typeof contentsOrPrompt === 'string') {

// --- Line 2950 ---
messages = [{ role: 'user', content: contentsOrPrompt }];

// --- Line 2951 ---
} else if (Array.isArray(contentsOrPrompt)) {

// --- Line 2952 ---
if (contentsOrPrompt.length > 0) {

// --- Line 2953 ---
systemPrompt = contentsOrPrompt[0].parts?.[0]?.text || "";

// --- Line 2954 ---
for (let i = 1; i < contentsOrPrompt.length; i++) {

// --- Line 2955 ---
const turn = contentsOrPrompt[i];

// --- Line 2956 ---
const role = turn.role === 'model' ? 'assistant' : 'user';

// --- Line 2957 ---
const text = turn.parts?.[0]?.text || "";

// --- Line 2958 ---
messages.push({ role: role, content: text });

// --- Line 2959 ---
}

// --- Line 2960 ---
}

// --- Line 2961 ---
}

// --- Line 2962 ---


// --- Line 2963 ---
const payload = {

// --- Line 2964 ---
model: model,

// --- Line 2965 ---
max_tokens: 4096,

// --- Line 2966 ---
messages: messages

// --- Line 2967 ---
};

// --- Line 2968 ---
if (systemPrompt) {

// --- Line 2969 ---
payload.system = systemPrompt;

// --- Line 2970 ---
}

// --- Line 2972 ---
let lastError = null;

// --- Line 2973 ---
let currentDelay = delay;

// --- Line 2974 ---


// --- Line 2975 ---
for (let i = 0; i < retries; i++) {

// --- Line 2976 ---
try {

// --- Line 2977 ---
const response = await fetch(apiUrl, {

// --- Line 2978 ---
method: 'POST',

// --- Line 2979 ---
headers: {

// --- Line 2980 ---
'Content-Type': 'application/json',

// --- Line 2981 ---
'x-api-key': apiKey,

// --- Line 2982 ---
'anthropic-version': '2023-06-01'

// --- Line 2983 ---
},

// --- Line 2984 ---
body: JSON.stringify(payload)

// --- Line 2985 ---
});

// --- Line 2986 ---


// --- Line 2987 ---
if (!response.ok) {

// --- Line 2988 ---
let errorMsg = `HTTP error! status: ${response.status}`;

// --- Line 2989 ---
try {

// --- Line 2990 ---
const errJson = await response.json();

// --- Line 2991 ---
if (errJson.error && errJson.error.message) {

// --- Line 2992 ---
errorMsg = errJson.error.message;

// --- Line 2993 ---
}

// --- Line 2994 ---
} catch (_) {}

// --- Line 2995 ---
throw new Error(errorMsg);

// --- Line 2996 ---
}

// --- Line 2997 ---
const result = await response.json();

// --- Line 2998 ---
const text = result.content?.[0]?.text;

// --- Line 2999 ---
if (text) return text;

// --- Line 3000 ---
else throw new Error('Resposta da API inv�lida ou vazia.');

// --- Line 3001 ---
} catch (error) {

// --- Line 3002 ---
lastError = error;

// --- Line 3003 ---
if (i === retries - 1) {

// --- Line 3004 ---
console.error(`Erro final ao chamar Anthropic (${model}):`, error);

// --- Line 3005 ---
} else {

// --- Line 3006 ---
await new Promise(res => setTimeout(res, currentDelay));

// --- Line 3007 ---
currentDelay *= 2;

// --- Line 3008 ---
}

// --- Line 3009 ---
}

// --- Line 3010 ---
}

// --- Line 3011 ---
throw lastError || new Error("Erro ao chamar a API da Anthropic.");

// --- Line 3012 ---
}

// --- Line 3013 ---
}

// --- Line 3014 ---


// --- Line 3015 ---
const callGemini = callAI;

// --- Line 3017 ---
async function generateSubtasks(block) {

// --- Line 3018 ---
if (!block || !block.length) return;

// --- Line 3019 ---
showLoader('? Gerando subtarefas com a IA...');

// --- Line 3020 ---
try {

// --- Line 3021 ---
for (const card of block) {

// --- Line 3022 ---
const originalText = card.querySelector('.text').textContent;

// --- Line 3023 ---
const prompt = `Aja como um assistente de produtividade. Quebre a seguinte tarefa em 3 
       a 5 subtarefas menores e acion�veis. Responda com uma lista de subtarefas, uma por linha. N�o adicione nenhum 
       outro texto, cabe�alhos, marcadores ou formata��o. Tarefa: "${originalText}"`;

// --- Line 3024 ---
const resultText = await callGemini(prompt);

// --- Line 3025 ---
const subtasks = resultText.split('\n').map(s => s.trim()).filter(Boolean);

// --- Line 3026 ---
if (subtasks.length > 0) {

// --- Line 3027 ---
let lastCard = card;

// --- Line 3028 ---
subtasks.forEach(taskText => {

// --- Line 3029 ---
const newCard = createCard({ text: "? " + taskText, color: card.dataset.color, 
       labelColor: card.dataset.labelColor || '', due: card.dataset.due, boardId: card.dataset.boardId });

// --- Line 3030 ---
if (!card.closest('#agenda-sidebar')) {

// --- Line 3031 ---
lastCard.parentElement.insertBefore(newCard, lastCard.nextSibling);

// --- Line 3032 ---
lastCard = newCard;

// --- Line 3033 ---
}

// --- Line 3034 ---
});

// --- Line 3035 ---
} else { throw new Error('Nenhuma subtarefa foi gerada.'); }

// --- Line 3036 ---
}

// --- Line 3037 ---
updateSlotsHasItems();

// --- Line 3038 ---
persist();

// --- Line 3039 ---
updateTotalTimerDisplay();

// --- Line 3040 ---
} catch (error) {

// --- Line 3041 ---
// Erro j� tratado no catch do callGemini se for falta de key

// --- Line 3042 ---
} finally {

// --- Line 3043 ---
hideLoader();

// --- Line 3044 ---
}

// --- Line 3045 ---
}

// --- Line 3046 ---


// --- Line 3047 ---
async function organizeCardWithGemini(block) {

// --- Line 3048 ---
if (!block || !block.length || !matrixEl) return;

// --- Line 3049 ---
showLoader('? Analisando tarefa com IA...');

// --- Line 3050 ---
const EISENHOWER_COLORS = { Q1: '#2e7d32', Q2: '#1976d2', Q3: '#ffb300', Q4: '#c62828' };

// --- Line 3051 ---
try {

// --- Line 3052 ---
for (const card of block) {

// --- Line 3053 ---
const originalText = card.querySelector('.text').textContent;

// --- Line 3054 ---
const prompt = `Aja como um especialista em produtividade usando a Matriz de 
       Eisenhower. Analise a seguinte tarefa e decida em qual quadrante ela se encaixa: Q1 (Urgente e Importante), Q2 
       (N�o Urgente e Importante), Q3 (Urgente e N�o Importante), ou Q4 (N�o Urgente e N�o Importante). Responda 
       APENAS com "Q1", "Q2", "Q3", ou "Q4". Tarefa: "${originalText}"`;

// --- Line 3055 ---
const resultQuad = (await callGemini(prompt)).trim().toUpperCase();

// --- Line 3056 ---
if (EISENHOWER_COLORS[resultQuad]) {

// --- Line 3057 ---
const dest = matrixEl.querySelector('.list[data-quad="' + resultQuad + '"] .cards');

// --- Line 3058 ---
if (dest) {

// --- Line 3059 ---
const cardInCache = allCards.find(c => c === card);

// --- Line 3060 ---
if (cardInCache) cardInCache.dataset.when = '';

// --- Line 3061 ---
card.dataset.when = '';

// --- Line 3062 ---


// --- Line 3063 ---
dest.appendChild(card);

// --- Line 3064 ---
card.dataset.labelColor = EISENHOWER_COLORS[resultQuad];

// --- Line 3065 ---
paintCard(card);

// --- Line 3066 ---
}

// --- Line 3067 ---
} else { console.warn('Resposta inesperada da IA:', resultQuad); }

// --- Line 3068 ---
}

// --- Line 3069 ---
updateSlotsHasItems();

// --- Line 3070 ---
persist();

// --- Line 3071 ---
updateTotalTimerDisplay();

// --- Line 3072 ---
} catch (error) {

// --- Line 3073 ---
// Erro j� tratado

// --- Line 3074 ---
} finally {

// --- Line 3075 ---
hideLoader();

// --- Line 3076 ---
}

// --- Line 3077 ---
}

// --- Line 3078 ---


// --- Line 3079 ---
// EVENTO DE SINCRONIZA��O ENTRE ABAS (LOCAL)

// --- Line 3080 ---
window.addEventListener('storage', function (e) {

// --- Line 3081 ---
if (e.key === LS_BOARD_PREFIX + currentBoardId || e.key === LS_GLOBAL_AGENDA) {

// --- Line 3082 ---
// Se mudou o quadro atual OU a agenda global

// --- Line 3083 ---
console.log("Sync: Aba local atualizada via localStorage");

// --- Line 3084 ---
isRemoteUpdate = true;

// --- Line 3085 ---
loadAndRenderAll();

// --- Line 3086 ---
isRemoteUpdate = false;

// --- Line 3088 ---
else if (e.key === LS_BOARDS_META) {

// --- Line 3089 ---
loadBoardsMetadata();

// --- Line 3090 ---
updateBoardSelectUI();

// --- Line 3091 ---
}

// --- Line 3092 ---
else if (e.key === LS_CURRENT_BOARD) {

// --- Line 3093 ---
const newId = e.newValue;

// --- Line 3094 ---
if (newId && newId !== currentBoardId) {

// --- Line 3095 ---
switchBoard(newId);

// --- Line 3096 ---
}

// --- Line 3097 ---
}

// --- Line 3098 ---
});

// --- Line 3099 ---


// --- Line 3100 ---
document.addEventListener('mousemove', (e) => {

// --- Line 3101 ---
lastMouseX = e.clientX;

// --- Line 3102 ---
lastMouseY = e.clientY;

// --- Line 3103 ---
updateMarquee(e);

// --- Line 3104 ---
});

// --- Line 3105 ---


// --- Line 3106 ---
// ===== MARQUEE SELECTION LOGIC =====

// --- Line 3107 ---
let marqueeStart = null;

// --- Line 3108 ---
const marqueeEl = document.getElementById('marquee');

// --- Line 3109 ---


// --- Line 3110 ---
document.addEventListener('mousedown', (e) => {

// --- Line 3111 ---
// S� inicia marquee se clicar no fundo (n�o em bot�es, inputs ou cards)

// --- Line 3112 ---
if (e.target.closest('.card') || e.target.closest('button') || e.target.closest('input') || 
       e.target.closest('.ctx') || e.target.closest('.modal')) return;

// --- Line 3113 ---
if (e.button !== 0) return; // S� bot�o esquerdo

// --- Line 3114 ---


// --- Line 3115 ---
// Se n�o segurar Ctrl/Shift, limpa sele��o anterior

// --- Line 3116 ---
if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {

// --- Line 3117 ---
clearSelection();

// --- Line 3118 ---
}

// --- Line 3119 ---


// --- Line 3120 ---
marqueeStart = { x: e.clientX, y: e.clientY };

// --- Line 3121 ---
});

// --- Line 3122 ---


// --- Line 3123 ---
function updateMarquee(e) {

// --- Line 3124 ---
if (!marqueeStart) return;

// --- Line 3125 ---


// --- Line 3126 ---
const x1 = marqueeStart.x;

// --- Line 3127 ---
const y1 = marqueeStart.y;

// --- Line 3128 ---
const x2 = e.clientX;

// --- Line 3129 ---
const y2 = e.clientY;

// --- Line 3130 ---


// --- Line 3131 ---
const left = Math.min(x1, x2);

// --- Line 3132 ---
const top = Math.min(y1, y2);

// --- Line 3133 ---
const width = Math.abs(x1 - x2);

// --- Line 3134 ---
const height = Math.abs(y1 - y2);

// --- Line 3135 ---


// --- Line 3136 ---
if (width > 5 || height > 5) { // Evita micro-movimentos

// --- Line 3137 ---
marqueeEl.style.display = 'block';

// --- Line 3138 ---
marqueeEl.style.left = left + 'px';

// --- Line 3139 ---
marqueeEl.style.top = top + 'px';

// --- Line 3140 ---
marqueeEl.style.width = width + 'px';

// --- Line 3141 ---
marqueeEl.style.height = height + 'px';

// --- Line 3142 ---


// --- Line 3143 ---
selectCardsInBox(left, top, width, height);

// --- Line 3144 ---
}

// --- Line 3145 ---
}

// --- Line 3147 ---
document.addEventListener('mouseup', () => {

// --- Line 3148 ---
marqueeStart = null;

// --- Line 3149 ---
marqueeEl.style.display = 'none';

// --- Line 3150 ---
});

// --- Line 3151 ---


// --- Line 3152 ---
function selectCardsInBox(l, t, w, h) {

// --- Line 3153 ---
allCards.forEach(card => {

// --- Line 3154 ---
const r = card.getBoundingClientRect();

// --- Line 3155 ---
// Verifica intersec��o

// --- Line 3156 ---
const inBox = !(r.left > l + w || r.right < l || r.top > t + h || r.bottom < t);

// --- Line 3157 ---


// --- Line 3158 ---
if (inBox) {

// --- Line 3159 ---
if (!selected.has(card)) addSelection(card);

// --- Line 3160 ---
} else if (!window._tempSelection?.has(card)) {

// --- Line 3161 ---
// Se n�o estava selecionado antes do in�cio do marquee, remove

// --- Line 3162 ---
// Mas aqui simplificamos: o marquee ADICIONA � sele��o se segurar Ctrl, 

// --- Line 3163 ---
// ou redefine se n�o segurar.

// --- Line 3164 ---
}

// --- Line 3165 ---
});

// --- Line 3168 ---
function updateTotalTimerDisplay() {

// --- Line 3169 ---
let selectedSeconds = 0;

// --- Line 3170 ---
let visibleSeconds = 0;

// --- Line 3171 ---
let totalSecondsAll = 0;

// --- Line 3172 ---
if (selected.size > 0) {

// --- Line 3173 ---
selected.forEach(card => {

// --- Line 3174 ---
selectedSeconds += parseInt(card.dataset.timerTotal || '0', 10);

// --- Line 3175 ---
});

// --- Line 3176 ---
}

// --- Line 3177 ---
allCards.forEach(card => {

// --- Line 3178 ---
const cardTime = parseInt(card.dataset.timerTotal || '0', 10);

// --- Line 3179 ---
totalSecondsAll += cardTime;

// --- Line 3180 ---
const style = window.getComputedStyle(card);

// --- Line 3181 ---
if (style.display !== 'none' && style.visibility !== 'hidden') {

// --- Line 3182 ---
if (card.offsetParent !== null) {

// --- Line 3183 ---
visibleSeconds += cardTime;

// --- Line 3184 ---
}

// --- Line 3185 ---
}

// --- Line 3186 ---
});

// --- Line 3187 ---
const displayText = selected.size > 0 ? formatSecondsToTime(selectedSeconds) : 
       formatSecondsToTime(visibleSeconds);

// --- Line 3188 ---
if (sumTimersDisplay) {

// --- Line 3189 ---
sumTimersDisplay.textContent = displayText;

// --- Line 3190 ---
sumTimersDisplay.title = `Selecionado: ${formatSecondsToTime(selectedSeconds)} / Filtrado: 
       ${formatSecondsToTime(visibleSeconds)} / Total: ${formatSecondsToTime(totalSecondsAll)}`;

// --- Line 3191 ---
}

// --- Line 3192 ---
}

// --- Line 3193 ---
function cardToData(c) {

// --- Line 3194 ---
var t = c.querySelector('.text');

// --- Line 3195 ---
return {

// --- Line 3196 ---
text: (t ? t.textContent : '').trim(),

// --- Line 3197 ---
color: c.dataset.color || '',

// --- Line 3198 ---
labelColor: c.dataset.labelColor || '',

// --- Line 3199 ---
due: c.dataset.due || '',

// --- Line 3200 ---
when: c.dataset.when || '',

// --- Line 3201 ---
timerTotal: c.dataset.timerTotal || '',

// --- Line 3202 ---
timerLeft: c.dataset.timerLeft || '',

// --- Line 3203 ---
timerState: c.dataset.timerState || '',

// --- Line 3204 ---
timerEnd: c.dataset.timerEnd || '',

// --- Line 3205 ---
completed: c.dataset.completed || 'false',

// --- Line 3206 ---
history: c.dataset.history || '[]',

// --- Line 3207 ---
boardId: c.dataset.boardId || '',

// --- Line 3208 ---
description: c.dataset.description || '',

// --- Line 3209 ---
duration: c.dataset.duration || '',

// --- Line 3210 ---
recurrence: c.dataset.recurrence || 'none',

// --- Line 3211 ---
cardId: c.dataset.cardId || '',

// --- Line 3212 ---
recurrenceParent: c.dataset.recurrenceParent || '',

// --- Line 3213 ---
alertEnabled: c.dataset.alertEnabled || 'false',

// --- Line 3214 ---
alertValue: c.dataset.alertValue || '15',

// --- Line 3215 ---
alertUnit: c.dataset.alertUnit || 'minutos',

// --- Line 3216 ---
alertFired: c.dataset.alertFired || 'false'

// --- Line 3217 ---
};

// --- Line 3218 ---
}

// --- Line 3219 ---


// --- Line 3220 ---
function addCardHistory(card, actionText) {

// --- Line 3221 ---
let hist = [];

// --- Line 3222 ---
try { hist = JSON.parse(card.dataset.history || '[]'); } catch(e) {}

// --- Line 3223 ---
hist.push({ action: actionText, time: Date.now() });

// --- Line 3224 ---
card.dataset.history = JSON.stringify(hist);

// --- Line 3225 ---
}

// --- Line 3226 ---


// --- Line 3227 ---
// FUN��O IMPORTANTE: Separa o que � do Quadro do que � da Agenda Global

// --- Line 3228 ---
function serializeAndSeparate() {

// --- Line 3229 ---
var boardData = [];

// --- Line 3230 ---
var agendaData = [];

// --- Line 3231 ---


// --- Line 3232 ---
// 1. Kanban Lists (Sempre do Quadro)

// --- Line 3233 ---
$$('.list[data-type="kanban"]', boardEl).forEach(function (l) {

// --- Line 3234 ---
const title = l.querySelector('.title').value;

// --- Line 3235 ---
const cardsInList = $$('.card', l).map(c => allCards.find(cacheCard => cacheCard === 
       c)).filter(Boolean).map(cardToData);

// --- Line 3236 ---
boardData.push({ type: 'kanban', title: title, cards: cardsInList, boardId: 
       l.dataset.boardId || '' });

// --- Line 3237 ---
});

// --- Line 3238 ---


// --- Line 3239 ---
// 2. Matrix Lists (Sempre do Quadro)

// --- Line 3240 ---
if (matrixEl) {

// --- Line 3241 ---
$$('.list[data-type="quad"]', matrixEl).forEach(function (l) {

// --- Line 3242 ---
const quad = l.dataset.quad;

// --- Line 3243 ---
const cardsInList = $$('.card', l).map(c => allCards.find(cacheCard => cacheCard === 
       c)).filter(Boolean).map(cardToData);

// --- Line 3244 ---
boardData.push({ type: 'quad', quad: quad, cards: cardsInList });

// --- Line 3245 ---
});

// --- Line 3246 ---
}

// --- Line 3247 ---


// --- Line 3248 ---
// 3. Agenda & Objetivos & Unscheduled (Sempre Global)

// --- Line 3249 ---
// Vamos procurar em allCards tudo que tem 'when' definido

// --- Line 3250 ---
// Isso pega tanto o que est� nos slots visuais quanto o que pode ter se perdido

// --- Line 3251 ---
const globalCards = allCards.filter(c => c.dataset.when && c.dataset.when.length > 0);

// --- Line 3252 ---


// --- Line 3253 ---
// Agrupar para salvar bonito, mas na real salvamos uma lista flat de "scheduled items" seria 
       melhor.

// --- Line 3254 ---
// Mas para manter compatibilidade com a estrutura antiga:

// --- Line 3255 ---


// --- Line 3256 ---
// Goal

// --- Line 3257 ---
const goalCards = globalCards.filter(c => c.dataset.when.endsWith('TGOAL')).map(cardToData);

// --- Line 3258 ---
if (goalCards.length > 0) agendaData.push({ type: 'goal', goal: true, cards: goalCards });

// --- Line 3259 ---


// --- Line 3260 ---
// Time Slots

// --- Line 3261 ---
const timeCardsMap = {};

// --- Line 3262 ---
globalCards.filter(c => /T\d{2}:\d{2}$/.test(c.dataset.when)).forEach(c => {

// --- Line 3263 ---
const time = c.dataset.when.substring(11); // Pega HH:MM

// --- Line 3264 ---
if (!timeCardsMap[time]) timeCardsMap[time] = [];

// --- Line 3265 ---
timeCardsMap[time].push(cardToData(c));

// --- Line 3266 ---
});

// --- Line 3267 ---
for (const t in timeCardsMap) {

// --- Line 3268 ---
agendaData.push({ type: 'time', time: t, cards: timeCardsMap[t] });

// --- Line 3269 ---
}

// --- Line 3270 ---


// --- Line 3271 ---
// Unscheduled (A definir)

// --- Line 3272 ---
const unscheduledCards = globalCards.filter(c => c.dataset.when.endsWith('T')).map(cardToData);

// --- Line 3273 ---
if (unscheduledCards.length > 0) {

// --- Line 3274 ---
agendaData.push({ type: 'unscheduled', cards: unscheduledCards });

// --- Line 3275 ---
}

// --- Line 3276 ---


// --- Line 3277 ---
return { boardData, agendaData };

// --- Line 3278 ---
}

// --- Line 3279 ---


// --- Line 3280 ---
function exportBackup() {

// --- Line 3281 ---
const backupData = {

// --- Line 3282 ---
version: '2.0',

// --- Line 3283 ---
boardsMeta: boardsMeta,

// --- Line 3284 ---
globalAgenda: JSON.parse(localStorage.getItem(LS_GLOBAL_AGENDA) || '[]'),

// --- Line 3285 ---
boards: {}

// --- Line 3286 ---
};

// --- Line 3287 ---
boardsMeta.forEach(b => {

// --- Line 3288 ---
backupData.boards[b.id] = JSON.parse(localStorage.getItem(LS_BOARD_PREFIX + b.id) || '[]');

// --- Line 3289 ---
});

// --- Line 3290 ---


// --- Line 3291 ---
let username = 'Usuario';

// --- Line 3292 ---
if (window.auth && window.auth.currentUser) {

// --- Line 3293 ---
username = window.auth.currentUser.displayName || window.auth.currentUser.email || 
       'Usuario';

// --- Line 3294 ---
} else if (typeof auth !== 'undefined' && auth && auth.currentUser) {

// --- Line 3295 ---
username = auth.currentUser.displayName || auth.currentUser.email || 'Usuario';

// --- Line 3296 ---
}

// --- Line 3297 ---
username = username.replace(/[\/\\?%*:|"<>\s]+/g, ' ').trim();

// --- Line 3298 ---
if (!username) username = 'Usuario';

// --- Line 3299 ---


// --- Line 3300 ---
const now = new Date();

// --- Line 3301 ---
const yyyy = now.getFullYear();

// --- Line 3302 ---
const mm = String(now.getMonth() + 1).padStart(2, '0');

// --- Line 3303 ---
const dd = String(now.getDate()).padStart(2, '0');

// --- Line 3304 ---
const hh = String(now.getHours()).padStart(2, '0');

// --- Line 3305 ---
const min = String(now.getMinutes()).padStart(2, '0');

// --- Line 3306 ---
const timestamp = `${yyyy}${mm}${dd}-${hh}${min}`;

// --- Line 3307 ---
const filename = `${username} ${timestamp}.json`;

// --- Line 3308 ---
const a = document.createElement('a');

// --- Line 3309 ---
a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, 
       null, 2));

// --- Line 3310 ---
a.download = filename;

// --- Line 3311 ---
a.click();

// --- Line 3312 ---
}

// --- Line 3313 ---


// --- Line 3314 ---
function importBackup(file) {

// --- Line 3315 ---
const reader = new FileReader();

// --- Line 3316 ---
reader.onload = function (e) {

// --- Line 3317 ---
try {

// --- Line 3318 ---
const data = JSON.parse(e.target.result);

// --- Line 3319 ---


// --- Line 3320 ---
if (data.version === '2.0' && data.boardsMeta && data.boards) {

// --- Line 3321 ---
showConfirm('Isso substituir� todos os seus quadros e agenda atuais. Deseja 
       continuar?', function() {

// --- Line 3322 ---
localStorage.setItem(LS_BOARDS_META, JSON.stringify(data.boardsMeta));

// --- Line 3323 ---
localStorage.setItem(LS_GLOBAL_AGENDA, JSON.stringify(data.globalAgenda || []));

// --- Line 3324 ---
Object.keys(data.boards).forEach(boardId => {

// --- Line 3325 ---
localStorage.setItem(LS_BOARD_PREFIX + boardId, 
       JSON.stringify(data.boards[boardId]));

// --- Line 3326 ---
});

// --- Line 3327 ---


// --- Line 3328 ---
let newCurrentId = localStorage.getItem(LS_CURRENT_BOARD);

// --- Line 3329 ---
if (!data.boardsMeta.find(b => b.id === newCurrentId)) {

// --- Line 3330 ---
if (data.boardsMeta.length > 0) newCurrentId = data.boardsMeta[0].id;

// --- Line 3331 ---
}

// --- Line 3332 ---
localStorage.setItem(LS_CURRENT_BOARD, newCurrentId);

// --- Line 3333 ---


// --- Line 3334 ---
// Se o Firebase estiver pronto e o usu�rio logado, salva na nuvem antes de 
       recarregar

// --- Line 3335 ---
if (isFirebaseReady && auth && auth.currentUser) {

// --- Line 3336 ---
const uid = auth.currentUser.uid;

// --- Line 3337 ---
const promises = [];

// --- Line 3338 ---


// --- Line 3339 ---
promises.push(db.ref('users/' + uid + '/meta').set(data.boardsMeta));

// --- Line 3340 ---
promises.push(db.ref('users/' + uid + 
       '/global/agenda').set(data.globalAgenda || []));

// --- Line 3341 ---
Object.keys(data.boards).forEach(boardId => {

// --- Line 3342 ---
promises.push(db.ref('users/' + uid + '/boards/' + 
       boardId).set(data.boards[boardId]));

// --- Line 3343 ---
});

// --- Line 3344 ---


// --- Line 3345 ---
// Adiciona um overlay visual de loading

// --- Line 3346 ---
const overlay = document.createElement('div');

// --- Line 3347 ---
overlay.style.position = 'fixed';

// --- Line 3348 ---
overlay.style.top = '0';

// --- Line 3349 ---
overlay.style.left = '0';

// --- Line 3350 ---
overlay.style.width = '100vw';

// --- Line 3351 ---
overlay.style.height = '100vh';

// --- Line 3352 ---
overlay.style.background = 'rgba(0,0,0,0.7)';

// --- Line 3353 ---
overlay.style.color = '#fff';

// --- Line 3354 ---
overlay.style.display = 'flex';

// --- Line 3355 ---
overlay.style.alignItems = 'center';

// --- Line 3356 ---
overlay.style.justifyContent = 'center';

// --- Line 3357 ---
overlay.style.fontSize = '24px';

// --- Line 3358 ---
overlay.style.zIndex = '99999';

// --- Line 3359 ---
overlay.innerText = 'Sincronizando com a nuvem... Por favor aguarde.';

// --- Line 3360 ---
document.body.appendChild(overlay);

// --- Line 3361 ---


// --- Line 3362 ---
Promise.all(promises)

// --- Line 3363 ---
.then(() => {

// --- Line 3364 ---
document.body.removeChild(overlay);

// --- Line 3365 ---
alert('Backup restaurado com sucesso e sincronizado na nuvem!');

// --- Line 3366 ---
window.location.reload();

// --- Line 3367 ---
})

// --- Line 3368 ---
.catch(err => {

// --- Line 3369 ---
document.body.removeChild(overlay);

// --- Line 3370 ---
console.error("Erro ao sincronizar backup com o Firebase:", err);

// --- Line 3371 ---
alert('O backup foi restaurado localmente, mas falhou ao enviar 
       para a nuvem: ' + err.message);

// --- Line 3372 ---
window.location.reload();

// --- Line 3373 ---
});

// --- Line 3374 ---
} else {

// --- Line 3375 ---
alert('Backup restaurado com sucesso!');

// --- Line 3376 ---
window.location.reload();

// --- Line 3377 ---
}

// --- Line 3378 ---
});

// --- Line 3379 ---
} else {

// --- Line 3380 ---
showConfirm('Detectado formato de backup de quadro �nico. Deseja mesclar com o 
       quadro ativo?', function() {

// --- Line 3381 ---
const dataToRestore = Array.isArray(data.data) ? data.data : data;

// --- Line 3382 ---
if (!Array.isArray(dataToRestore)) {

// --- Line 3383 ---
throw new Error("Formato inv�lido.");

// --- Line 3384 ---
}

// --- Line 3385 ---


// --- Line 3386 ---
const boardData = dataToRestore.filter(d => d.type === 'kanban' || d.type === 
       'quad');

// --- Line 3387 ---
const agendaData = dataToRestore.filter(d => d.type === 'time' || d.type === 
       'goal' || d.type === 'unscheduled');

// --- Line 3388 ---


// --- Line 3389 ---
localStorage.setItem(LS_BOARD_PREFIX + currentBoardId, 
       JSON.stringify(boardData));

// --- Line 3390 ---
let mergedAgenda = [];

// --- Line 3391 ---
if (agendaData.length > 0) {

// --- Line 3392 ---
const currentAgenda = JSON.parse(localStorage.getItem(LS_GLOBAL_AGENDA) || 
       '[]');

// --- Line 3393 ---
mergedAgenda = currentAgenda.concat(agendaData);

// --- Line 3394 ---
localStorage.setItem(LS_GLOBAL_AGENDA, JSON.stringify(mergedAgenda));

// --- Line 3395 ---
}

// --- Line 3396 ---


// --- Line 3397 ---
// Se o Firebase estiver pronto e o usu�rio logado, salva na nuvem antes de 
       recarregar

// --- Line 3398 ---
if (isFirebaseReady && auth && auth.currentUser) {

// --- Line 3399 ---
const uid = auth.currentUser.uid;

// --- Line 3400 ---
const promises = [];

// --- Line 3401 ---


// --- Line 3402 ---
promises.push(db.ref('users/' + uid + '/boards/' + 
       currentBoardId).set(boardData));

// --- Line 3403 ---
if (agendaData.length > 0) {

// --- Line 3404 ---
promises.push(db.ref('users/' + uid + 
       '/global/agenda').set(mergedAgenda));

// --- Line 3405 ---
}

// --- Line 3406 ---


// --- Line 3407 ---
Promise.all(promises)

// --- Line 3408 ---
.then(() => {

// --- Line 3409 ---
alert('Quadro importado com sucesso e sincronizado na nuvem!');

// --- Line 3410 ---
window.location.reload();

// --- Line 3411 ---
})

// --- Line 3412 ---
.catch(err => {

// --- Line 3413 ---
console.error("Erro ao sincronizar quadro �nico:", err);

// --- Line 3414 ---
alert('Quadro importado localmente, mas falhou ao enviar para a 
       nuvem: ' + err.message);

// --- Line 3415 ---
window.location.reload();

// --- Line 3416 ---
});

// --- Line 3417 ---
} else {

// --- Line 3418 ---
alert('Quadro importado com sucesso!');

// --- Line 3419 ---
window.location.reload();

// --- Line 3420 ---
}

// --- Line 3421 ---
});

// --- Line 3422 ---
}

// --- Line 3423 ---
} catch (err) {

// --- Line 3424 ---
alert('Erro ao importar backup: ' + err.message);

// --- Line 3425 ---
}

// --- Line 3426 ---
};

// --- Line 3427 ---
reader.readAsText(file);

// --- Line 3428 ---
}

// --- Line 3429 ---


// --- Line 3430 ---
var HIST_LIMIT = 120; var hist = [], cursor = -1;

// --- Line 3431 ---
function pushHistory(snap) {

// --- Line 3432 ---
// Snap agora � um objeto { boardData, agendaData }

// --- Line 3433 ---
hist = hist.slice(0, cursor + 1); hist.push(snap);

// --- Line 3434 ---
if (hist.length > HIST_LIMIT) { hist.shift(); } cursor = hist.length - 1; updateUndoUi();

// --- Line 3435 ---
}

// --- Line 3436 ---
function capture() {

// --- Line 3437 ---
if (__muteHistory > 0) return;

// --- Line 3438 ---
try { pushHistory(serializeAndSeparate()); } catch (e) { }

// --- Line 3439 ---
}

// --- Line 3440 ---
function canUndo() { return cursor > 0; }

// --- Line 3441 ---
function canRedo() { return cursor >= 0 && cursor < hist.length - 1; }

// --- Line 3442 ---
function updateUndoUi() {

// --- Line 3443 ---
const undoBtn = document.getElementById('undo');

// --- Line 3444 ---
const redoBtn = document.getElementById('redo');

// --- Line 3445 ---
if (undoBtn) undoBtn.disabled = !canUndo();

// --- Line 3446 ---
if (redoBtn) redoBtn.disabled = !canRedo();

// --- Line 3447 ---
}

// --- Line 3448 ---
function doUndo() { if (!canUndo()) return; withMute(function () { cursor--; restore(hist[cursor]); 
       }); updateUndoUi(); }

// --- Line 3449 ---
function doRedo() { if (!canRedo()) return; withMute(function () { cursor++; restore(hist[cursor]); 
       }); updateUndoUi(); }

// --- Line 3450 ---
function loadAndRenderAll() {

// --- Line 3451 ---
let boardData = [];

// --- Line 3452 ---
let agendaData = [];

// --- Line 3453 ---


// --- Line 3454 ---
if (currentBoardId === 'board-todos') {

// --- Line 3455 ---
// Aggregate all boards except trash and board-todos itself

// --- Line 3456 ---
let mergedKanbanLists = [];

// --- Line 3457 ---
let mergedQuadLists = { Q1: [], Q2: [], Q3: [], Q4: [] };

// --- Line 3458 ---
const vBoards = getVisibleBoardsInTodos();

// --- Line 3459 ---


// --- Line 3460 ---
boardsMeta.forEach(b => {

// --- Line 3461 ---
if (b.id === 'board-trash' || b.id === 'board-todos') return;

// --- Line 3462 ---
if (!vBoards.has(b.id)) return;

// --- Line 3463 ---
let bData = [];

// --- Line 3464 ---
try {

// --- Line 3465 ---
const bStr = localStorage.getItem(LS_BOARD_PREFIX + b.id);

// --- Line 3466 ---
if (bStr) bData = JSON.parse(bStr);

// --- Line 3467 ---
} catch (e) { console.error("Error load board", b.id, e); }

// --- Line 3468 ---


// --- Line 3469 ---
bData.forEach(list => {

// --- Line 3470 ---
if (list.type === 'kanban') {

// --- Line 3471 ---
let targetList = mergedKanbanLists.find(l => l.title.toLowerCase().trim() === 
       list.title.toLowerCase().trim());

// --- Line 3472 ---
if (!targetList) {

// --- Line 3473 ---
targetList = { type: 'kanban', title: list.title, cards: [], boardId: b.id 
       };

// --- Line 3474 ---
mergedKanbanLists.push(targetList);

// --- Line 3475 ---
}

// --- Line 3476 ---
const cardsWithBoardId = (list.cards || []).map(c => {

// --- Line 3477 ---
return { ...c, boardId: c.boardId || b.id };

// --- Line 3478 ---
});

// --- Line 3479 ---
targetList.cards = targetList.cards.concat(cardsWithBoardId);

// --- Line 3480 ---
} else if (list.type === 'quad' && mergedQuadLists[list.quad]) {

// --- Line 3481 ---
const cardsWithBoardId = (list.cards || []).map(c => {

// --- Line 3482 ---
return { ...c, boardId: c.boardId || b.id };

// --- Line 3483 ---
});

// --- Line 3484 ---
mergedQuadLists[list.quad] = 
       mergedQuadLists[list.quad].concat(cardsWithBoardId);

// --- Line 3485 ---
}

// --- Line 3486 ---
});

// --- Line 3487 ---
});

// --- Line 3488 ---


// --- Line 3489 ---
// Add TODOS's own cards if they exist

// --- Line 3490 ---
let todosOwnData = [];

// --- Line 3491 ---
try {

// --- Line 3492 ---
const todosOwnStr = localStorage.getItem(LS_BOARD_PREFIX + 'board-todos');

// --- Line 3493 ---
if (todosOwnStr) todosOwnData = JSON.parse(todosOwnStr);

// --- Line 3494 ---
} catch(e) {}

// --- Line 3495 ---
todosOwnData.forEach(list => {

// --- Line 3496 ---
if (list.type === 'kanban') {

// --- Line 3497 ---
let targetList = mergedKanbanLists.find(l => l.title.toLowerCase().trim() === 
       list.title.toLowerCase().trim());

// --- Line 3498 ---
if (!targetList) {

// --- Line 3499 ---
targetList = { type: 'kanban', title: list.title, cards: [], boardId: 
       'board-todos' };

// --- Line 3500 ---
mergedKanbanLists.push(targetList);

// --- Line 3501 ---
}

// --- Line 3502 ---
const cardsWithBoardId = (list.cards || []).map(c => {

// --- Line 3503 ---
return { ...c, boardId: c.boardId || 'board-todos' };

// --- Line 3504 ---
});

// --- Line 3505 ---
targetList.cards = targetList.cards.concat(cardsWithBoardId);

// --- Line 3506 ---
} else if (list.type === 'quad' && mergedQuadLists[list.quad]) {

// --- Line 3507 ---
const cardsWithBoardId = (list.cards || []).map(c => {

// --- Line 3508 ---
return { ...c, boardId: c.boardId || 'board-todos' };

// --- Line 3509 ---
});

// --- Line 3510 ---
mergedQuadLists[list.quad] = mergedQuadLists[list.quad].concat(cardsWithBoardId);

// --- Line 3511 ---
}

// --- Line 3512 ---
});

// --- Line 3514 ---
boardData = mergedKanbanLists;

// --- Line 3515 ---
Object.keys(mergedQuadLists).forEach(q => {

// --- Line 3516 ---
boardData.push({ type: 'quad', quad: q, cards: mergedQuadLists[q] });

// --- Line 3517 ---
});

// --- Line 3518 ---
} else {

// --- Line 3519 ---
try {

// --- Line 3520 ---
const bStr = localStorage.getItem(LS_BOARD_PREFIX + currentBoardId);

// --- Line 3521 ---
if (bStr) boardData = JSON.parse(bStr);

// --- Line 3522 ---
} catch (e) { console.error("Erro load board", e); }

// --- Line 3523 ---
}

// --- Line 3525 ---
try {

// --- Line 3526 ---
const aStr = localStorage.getItem(LS_GLOBAL_AGENDA);

// --- Line 3527 ---
if (aStr) agendaData = JSON.parse(aStr);

// --- Line 3528 ---
} catch (e) { console.error("Erro load agenda", e); }

// --- Line 3529 ---


// --- Line 3530 ---
// Filter global agenda data if on board-todos

// --- Line 3531 ---
if (currentBoardId === 'board-todos') {

// --- Line 3532 ---
const vBoards = getVisibleBoardsInTodos();

// --- Line 3533 ---
agendaData = agendaData.map(list => {

// --- Line 3534 ---
return {

// --- Line 3535 ---
...list,

// --- Line 3536 ---
cards: (list.cards || []).filter(c => vBoards.has(c.boardId || 'board-todos'))

// --- Line 3537 ---
};

// --- Line 3538 ---
});

// --- Line 3539 ---
}

// --- Line 3540 ---


// --- Line 3541 ---
// Se for a primeira vez e n�o tiver agenda global, tenta migrar dados da agenda que estavam no board

// --- Line 3542 ---
// (Isso previne perda de dados ao atualizar o c�digo)

// --- Line 3543 ---
if (agendaData.length === 0 && boardData.some(d => d.type === 'time' || d.type === 'goal' || 
       d.type === 'unscheduled')) {

// --- Line 3544 ---
console.log("Migrando agenda do quadro para global...");

// --- Line 3545 ---
agendaData = boardData.filter(d => d.type === 'time' || d.type === 'goal' || d.type === 
       'unscheduled');

// --- Line 3546 ---
boardData = boardData.filter(d => d.type === 'kanban' || d.type === 'quad');

// --- Line 3547 ---
// Salva a migra��o

// --- Line 3548 ---
localStorage.setItem(LS_BOARD_PREFIX + currentBoardId, JSON.stringify(boardData));

// --- Line 3549 ---
localStorage.setItem(LS_GLOBAL_AGENDA, JSON.stringify(agendaData));

// --- Line 3550 ---
}

// --- Line 3551 ---


// --- Line 3552 ---
// Sincronizar boardId nos cart�es se n�o tiver

// --- Line 3553 ---
if (currentBoardId !== 'board-todos') {

// --- Line 3554 ---
boardData.forEach(list => {

// --- Line 3555 ---
if (list.cards) {

// --- Line 3556 ---
list.cards.forEach(c => {

// --- Line 3557 ---
if (!c.boardId) c.boardId = currentBoardId;

// --- Line 3558 ---
});

// --- Line 3559 ---
}

// --- Line 3560 ---
});

// --- Line 3561 ---
}

// --- Line 3562 ---
agendaData.forEach(list => {

// --- Line 3563 ---
if (list.cards) {

// --- Line 3564 ---
list.cards.forEach(c => {

// --- Line 3565 ---
if (!c.boardId) c.boardId = currentBoardId || 'board-todos';

// --- Line 3566 ---
});

// --- Line 3567 ---
}

// --- Line 3568 ---
});

// --- Line 3569 ---


// --- Line 3570 ---
renderFromData(boardData, agendaData);

// --- Line 3571 ---
}

// --- Line 3572 ---


// --- Line 3573 ---
function renderFromData(boardData, agendaData) {

// --- Line 3574 ---
// === PRESERVAR SELE��O ===

// --- Line 3575 ---
window._selectedIdsToRestore = new Set();

// --- Line 3576 ---
if (typeof selected !== 'undefined' && selected.forEach) {

// --- Line 3577 ---
selected.forEach(card => {

// --- Line 3578 ---
if (card && card.dataset && card.dataset.cardId) {

// --- Line 3579 ---
window._selectedIdsToRestore.add(card.dataset.cardId);

// --- Line 3580 ---
}

// --- Line 3581 ---
});

// --- Line 3582 ---
selected.clear();

// --- Line 3583 ---
}

// --- Line 3584 ---


// --- Line 3585 ---
// Junta os dois para renderizar, mas a l�gica interna sabe que vieram de lugares diferentes

// --- Line 3586 ---
// Na verdade, a fun��o original renderFromData aceitava um array �nico.

// --- Line 3587 ---
// Vamos concatenar para reusar a l�gica de renderiza��o, pois visualmente � tudo card.

// --- Line 3588 ---
const allData = (boardData || []).concat(agendaData || []);

// --- Line 3589 ---


// --- Line 3590 ---
// === PRESERVAR SCROLL ===

// --- Line 3591 ---
const scrollMap = new Map();

// --- Line 3592 ---
scrollMap.set(boardEl, { left: boardEl.scrollLeft, top: boardEl.scrollTop });

// --- Line 3593 ---
const mainContent = document.getElementById('main-content');

// --- Line 3594 ---
if (mainContent) scrollMap.set(mainContent, { left: mainContent.scrollLeft, top: 
       mainContent.scrollTop });

// --- Line 3595 ---
const slots = document.getElementById('slots');

// --- Line 3596 ---
if (slots) scrollMap.set(slots, { left: slots.scrollLeft, top: slots.scrollTop });

// --- Line 3597 ---
if (matrixEl) scrollMap.set(matrixEl, { left: matrixEl.scrollLeft, top: matrixEl.scrollTop });

// --- Line 3598 ---


// --- Line 3599 ---
allCards = [];

// --- Line 3600 ---
boardEl.innerHTML = '';

// --- Line 3601 ---
matrixEl.innerHTML = '';

// --- Line 3602 ---
slotsRoot.innerHTML = '';

// --- Line 3603 ---


// --- Line 3604 ---
ensureMatrix();

// --- Line 3605 ---
ensureSchedule(false);

// --- Line 3606 ---


// --- Line 3607 ---
var quadMap = {

// --- Line 3608 ---
Q1: matrixEl.querySelector('.list[data-quad="Q1"] .cards'),

// --- Line 3609 ---
Q2: matrixEl.querySelector('.list[data-quad="Q2"] .cards'),

// --- Line 3610 ---
Q3: matrixEl.querySelector('.list[data-quad="Q3"] .cards'),

// --- Line 3611 ---
Q4: matrixEl.querySelector('.list[data-quad="Q4"] .cards')

// --- Line 3612 ---
};

// --- Line 3614 ---
function appendCardsToDOM(container, cardsData) {

// --- Line 3615 ---
if (!container || !cardsData || !cardsData.length) return;

// --- Line 3616 ---
var fragment = document.createDocumentFragment();

// --- Line 3617 ---
cardsData.forEach(function (cd) {

// --- Line 3618 ---
const cardEl = createCard(cd);

// --- Line 3619 ---
fragment.appendChild(cardEl);

// --- Line 3620 ---
});

// --- Line 3621 ---
container.appendChild(fragment);

// --- Line 3622 ---
}

// --- Line 3623 ---


// --- Line 3624 ---
allData.forEach(function (entry) {

// --- Line 3625 ---
if (entry.type === 'kanban') {

// --- Line 3626 ---
var l = createList(entry.title || 'Lista');

// --- Line 3627 ---
l.dataset.boardId = entry.boardId || currentBoardId;

// --- Line 3628 ---
appendCardsToDOM(l.querySelector('.cards'), entry.cards);

// --- Line 3629 ---
} else if (entry.type === 'quad' && quadMap[entry.quad]) {

// --- Line 3630 ---
appendCardsToDOM(quadMap[entry.quad], entry.cards);

// --- Line 3631 ---
} else if (entry.type === 'time' || entry.type === 'goal') {

// --- Line 3632 ---
(entry.cards || []).forEach(cardData => {

// --- Line 3633 ---
if (entry.goal && cardData.when && !cardData.when.endsWith('TGOAL')) {

// --- Line 3634 ---
cardData.when = (cardData.when.split('T')[0] || getActiveDay()) + 'TGOAL';

// --- Line 3635 ---
} else if (entry.time && cardData.when && !cardData.when.includes('T' + 
       entry.time)) {

// --- Line 3636 ---
cardData.when = (cardData.when.split('T')[0] || getActiveDay()) + 'T' + 
       entry.time;

// --- Line 3637 ---
}

// --- Line 3638 ---
createCard(cardData);

// --- Line 3639 ---
});

// --- Line 3640 ---
} else if (entry.type === 'unscheduled') {

// --- Line 3641 ---
(entry.cards || []).forEach(cardData => {

// --- Line 3642 ---
createCard(cardData);

// --- Line 3643 ---
});

// --- Line 3644 ---
}

// --- Line 3645 ---
});

// --- Line 3646 ---


// --- Line 3647 ---
applyFilters();

// --- Line 3648 ---
updateSlotsHasItems();

// --- Line 3649 ---
updateTotalTimerDisplay();

// --- Line 3650 ---


// --- Line 3651 ---
if (globalTimerInterval) {

// --- Line 3652 ---
clearInterval(globalTimerInterval);

// --- Line 3653 ---
globalTimerInterval = null;

// --- Line 3654 ---
}

// --- Line 3655 ---
startGlobalTimer();

// --- Line 3656 ---


// --- Line 3657 ---
scrollMap.forEach((pos, element) => {

// --- Line 3658 ---
if (element) {

// --- Line 3659 ---
element.scrollLeft = pos.left;

// --- Line 3660 ---
element.scrollTop = pos.top;

// --- Line 3661 ---
}

// --- Line 3662 ---
});

// --- Line 3663 ---
window._selectedIdsToRestore = null;

// --- Line 3664 ---
}

// --- Line 3665 ---


// --- Line 3666 ---
function restore(histObj) {

// --- Line 3667 ---
// histObj tem { boardData, agendaData }

// --- Line 3668 ---
if (histObj && histObj.boardData) {

// --- Line 3669 ---
renderFromData(histObj.boardData, histObj.agendaData);

// --- Line 3670 ---
persist(); // Salva o estado restaurado

// --- Line 3671 ---
} else {

// --- Line 3672 ---
// Fallback para formato antigo de historico se existir

// --- Line 3673 ---
renderFromData(histObj, []);

// --- Line 3674 ---
}

// --- Line 3675 ---
}

// --- Line 3676 ---


// --- Line 3677 ---
// ===== BOARD MANAGEMENT CORE =====

// --- Line 3678 ---
function generateId() {

// --- Line 3679 ---
return Date.now().toString(36) + Math.random().toString(36).substr(2);

// --- Line 3680 ---
}

// --- Line 3681 ---


// --- Line 3682 ---
function loadBoardsMetadata() {

// --- Line 3683 ---
try {

// --- Line 3684 ---
const raw = localStorage.getItem(LS_BOARDS_META);

// --- Line 3685 ---
boardsMeta = raw ? JSON.parse(raw) : [];

// --- Line 3686 ---
} catch (e) { boardsMeta = []; }

// --- Line 3687 ---
}

// --- Line 3689 ---
function saveBoardsMetadata(syncToCloud = true) {

// --- Line 3690 ---
localStorage.setItem(LS_BOARDS_META, JSON.stringify(boardsMeta));

// --- Line 3691 ---
updateBoardSelectUI();

// --- Line 3692 ---


// --- Line 3693 ---
// Sync metadata to Firebase

// --- Line 3694 ---
if (syncToCloud && isFirebaseReady && auth && auth.currentUser) {

// --- Line 3695 ---
db.ref('users/' + auth.currentUser.uid + '/meta').set(boardsMeta)

// --- Line 3696 ---
.catch(e => console.error("Erro ao salvar metadata na nuvem", e));

// --- Line 3697 ---
}

// --- Line 3698 ---
}

// --- Line 3699 ---


// --- Line 3700 ---
function ensureTodosBoard() {

// --- Line 3701 ---
if (!boardsMeta.find(b => b.id === 'board-todos')) {

// --- Line 3702 ---
boardsMeta.unshift({ id: 'board-todos', name: 'TODOS ??', lastModified: Date.now(), color: 
       '#1976d2' });

// --- Line 3703 ---
saveBoardsMetadata(true);

// --- Line 3704 ---
}

// --- Line 3705 ---
}

// --- Line 3706 ---


// --- Line 3707 ---
function ensureTrashBoard() {

// --- Line 3708 ---
if (!boardsMeta.find(b => b.id === 'board-trash')) {

// --- Line 3709 ---
boardsMeta.push({ id: 'board-trash', name: 'Lixeira ???', lastModified: Date.now(), color: 
       '#5a1419' });

// --- Line 3710 ---
localStorage.setItem(LS_BOARD_PREFIX + 'board-trash', JSON.stringify([{ type: 'kanban', 
       title: 'Apagados', cards: [] }]));

// --- Line 3711 ---
saveBoardsMetadata(true);

// --- Line 3712 ---
}

// --- Line 3713 ---
}

// --- Line 3714 ---


// --- Line 3715 ---
function migrateToMultiBoard() {

// --- Line 3716 ---
const legacyData = localStorage.getItem(LS_KEY);

// --- Line 3717 ---
const hasMetadata = localStorage.getItem(LS_BOARDS_META);

// --- Line 3719 ---
if (legacyData && !hasMetadata) {

// --- Line 3720 ---
console.log("Migrando para multi-board...");

// --- Line 3721 ---
const newId = generateId();

// --- Line 3722 ---
const mainBoard = { id: newId, name: 'Quadro Principal', lastModified: Date.now(), color: 
       DEFAULT_THEME_COLOR };

// --- Line 3723 ---
boardsMeta = [mainBoard];

// --- Line 3724 ---
ensureTodosBoard();

// --- Line 3725 ---
ensureTrashBoard();

// --- Line 3726 ---


// --- Line 3727 ---
// Tenta separar o que � agenda do que � quadro na migra��o inicial

// --- Line 3728 ---
// (Simplificado: joga tudo no quadro primeiro, o loadAndRenderAll separa depois)

// --- Line 3729 ---
localStorage.setItem(LS_BOARD_PREFIX + newId, legacyData);

// --- Line 3730 ---


// --- Line 3731 ---
currentBoardId = newId;

// --- Line 3732 ---
localStorage.setItem(LS_CURRENT_BOARD, currentBoardId);

// --- Line 3733 ---
saveBoardsMetadata();

// --- Line 3734 ---
} else if (!hasMetadata) {

// --- Line 3735 ---
createNewBoard('Meu Quadro');

// --- Line 3736 ---
ensureTodosBoard();

// --- Line 3737 ---
ensureTrashBoard();

// --- Line 3738 ---
} else {

// --- Line 3739 ---
loadBoardsMetadata();

// --- Line 3740 ---
ensureTodosBoard();

// --- Line 3741 ---
ensureTrashBoard();

// --- Line 3742 ---
currentBoardId = localStorage.getItem(LS_CURRENT_BOARD);

// --- Line 3743 ---
if (!boardsMeta.find(b => b.id === currentBoardId)) {

// --- Line 3744 ---
if (boardsMeta.length > 0) currentBoardId = boardsMeta[0].id;

// --- Line 3745 ---
else createNewBoard('Meu Quadro');

// --- Line 3746 ---
}

// --- Line 3747 ---
}

// --- Line 3748 ---
}

// --- Line 3749 ---


// --- Line 3750 ---
function createNewBoard(name) {

// --- Line 3751 ---
const id = generateId();

// --- Line 3752 ---
const newBoard = { id: id, name: name || 'Novo Quadro', lastModified: Date.now(), color: 
       DEFAULT_THEME_COLOR };

// --- Line 3753 ---
boardsMeta.push(newBoard);

// --- Line 3754 ---
saveBoardsMetadata();

// --- Line 3755 ---
localStorage.setItem(LS_BOARD_PREFIX + id, JSON.stringify([]));

// --- Line 3756 ---
switchBoard(id);

// --- Line 3757 ---
}

// --- Line 3758 ---


// --- Line 3759 ---
function renameBoard() {

// --- Line 3760 ---
if (currentBoardId === 'board-todos' || currentBoardId === 'board-trash') {

// --- Line 3761 ---
alert("Voc� n�o pode alterar ou renomear este quadro especial.");

// --- Line 3762 ---
return;

// --- Line 3763 ---
}

// --- Line 3764 ---
const board = boardsMeta.find(b => b.id === currentBoardId);

// --- Line 3765 ---
if (!board) return;

// --- Line 3766 ---
const newName = prompt("Novo nome para o quadro:", board.name);

// --- Line 3767 ---
if (newName && newName.trim()) {

// --- Line 3768 ---
board.name = newName.trim();

// --- Line 3769 ---
saveBoardsMetadata();

// --- Line 3770 ---
}

// --- Line 3771 ---
}

// --- Line 3772 ---


// --- Line 3773 ---
function deleteBoard() {

// --- Line 3774 ---
if (currentBoardId === 'board-todos' || currentBoardId === 'board-trash') {

// --- Line 3775 ---
alert("Voc� n�o pode excluir este quadro especial.");

// --- Line 3776 ---
return;

// --- Line 3777 ---
}

// --- Line 3778 ---
if (boardsMeta.length <= 2) { // 2 because TODOS and Lixeira are permanent

// --- Line 3779 ---
alert("Voc� n�o tem outros quadros para excluir.");

// --- Line 3780 ---
return;

// --- Line 3781 ---
}

// --- Line 3782 ---
const board = boardsMeta.find(b => b.id === currentBoardId);

// --- Line 3783 ---
if (!board) return;

// --- Line 3784 ---


// --- Line 3785 ---
if (confirm(`Tem certeza que deseja excluir o quadro "${board.name}"? Isso n�o pode ser 
       desfeito.`)) {

// --- Line 3786 ---
localStorage.removeItem(LS_BOARD_PREFIX + currentBoardId);

// --- Line 3787 ---
if (isFirebaseReady && auth && auth.currentUser) {

// --- Line 3788 ---
db.ref('users/' + auth.currentUser.uid + '/boards/' + currentBoardId).remove();

// --- Line 3789 ---
}

// --- Line 3790 ---
boardsMeta = boardsMeta.filter(b => b.id !== currentBoardId);

// --- Line 3791 ---
// Switch to first non-todos board if possible

// --- Line 3792 ---
const nextBoard = boardsMeta.find(b => b.id !== 'board-trash') || boardsMeta[0];

// --- Line 3793 ---
currentBoardId = nextBoard.id;

// --- Line 3794 ---
saveBoardsMetadata();

// --- Line 3795 ---
localStorage.setItem(LS_CURRENT_BOARD, currentBoardId);

// --- Line 3796 ---
window.location.reload();

// --- Line 3797 ---
}

// --- Line 3798 ---
}

// --- Line 3799 ---


// --- Line 3800 ---
function cloneBoard() {

// --- Line 3801 ---
const board = boardsMeta.find(b => b.id === currentBoardId);

// --- Line 3802 ---
if (!board) return;

// --- Line 3803 ---
const newName = prompt("Nome para a c�pia:", board.name + " (C�pia)");

// --- Line 3804 ---
if (!newName) return;

// --- Line 3805 ---


// --- Line 3806 ---
// Na c�pia, pegamos APENAS os dados do quadro, n�o a agenda (que � global)

// --- Line 3807 ---
const { boardData } = serializeAndSeparate();

// --- Line 3808 ---
const newId = generateId();

// --- Line 3809 ---


// --- Line 3810 ---
const newBoard = { id: newId, name: newName, lastModified: Date.now(), color: board.color || 
       DEFAULT_THEME_COLOR };

// --- Line 3811 ---
boardsMeta.push(newBoard);

// --- Line 3812 ---
saveBoardsMetadata();

// --- Line 3813 ---


// --- Line 3814 ---
localStorage.setItem(LS_BOARD_PREFIX + newId, JSON.stringify(boardData));

// --- Line 3815 ---
switchBoard(newId);

// --- Line 3816 ---
}

// --- Line 3817 ---


// --- Line 3818 ---
function switchBoard(id) {

// --- Line 3819 ---
if (id === currentBoardId && boardEl.children.length > 0) return;

// --- Line 3820 ---


// --- Line 3821 ---
saveImmediately();

// --- Line 3822 ---


// --- Line 3823 ---
console.log("Switching to board: " + id);

// --- Line 3824 ---
currentBoardId = id;

// --- Line 3825 ---
localStorage.setItem(LS_CURRENT_BOARD, id);

// --- Line 3826 ---


// --- Line 3827 ---
const filterBoardsBtn = document.getElementById('filterBoardsBtn');

// --- Line 3828 ---
if (filterBoardsBtn) {

// --- Line 3829 ---
filterBoardsBtn.style.display = (id === 'board-todos') ? 'inline-block' : 'none';

// --- Line 3830 ---
}

// --- Line 3831 ---


// --- Line 3832 ---
const board = boardsMeta.find(b => b.id === id);

// --- Line 3833 ---
if (board) setBoardTheme(board.color);

// --- Line 3834 ---


// --- Line 3835 ---
loadAndRenderAll();

// --- Line 3836 ---


// --- Line 3837 ---
// Reinicia historico de undo

// --- Line 3838 ---
hist = []; cursor = -1;

// --- Line 3839 ---
const { boardData, agendaData } = serializeAndSeparate();

// --- Line 3840 ---
pushHistory({ boardData, agendaData });

// --- Line 3841 ---


// --- Line 3842 ---
updateBoardSelectUI();

// --- Line 3843 ---


// --- Line 3844 ---
if (isFirebaseReady && auth && auth.currentUser) {

// --- Line 3845 ---
subscribeToCurrentBoard(auth.currentUser.uid, id);

// --- Line 3846 ---
}

// --- Line 3847 ---
}

// --- Line 3848 ---


// --- Line 3849 ---
// ===== THEMES & CROSS-BOARD =====

// --- Line 3850 ---
// ... (THEMES code remains same) ...

// --- Line 3851 ---
const THEMES = {

// --- Line 3852 ---
'#1976d2': { name: 'Azul (Padr�o)', brand: '#1976d2', bg: '#0f1a2a', panel: '#0f223d', card: 
       '#112b4a', text: '#e9f1ff' },

// --- Line 3853 ---
'#2e7d32': { name: 'Verde Floresta', brand: '#2e7d32', bg: '#0b160b', panel: '#142517', card: 
       '#1a321e', text: '#e8f5e9' },

// --- Line 3854 ---
'#7b1fa2': { name: 'Roxo Profundo', brand: '#7b1fa2', bg: '#100614', panel: '#210e29', card: 
       '#2c1236', text: '#f3e5f5' },

// --- Line 3855 ---
'#e65100': { name: 'Laranja Queimado', brand: '#e65100', bg: '#180d00', panel: '#2e1900', card: 
       '#3d2200', text: '#fff3e0' },

// --- Line 3856 ---
'#c62828': { name: 'Vermelho Tijolo', brand: '#c62828', bg: '#140505', panel: '#2a0a0a', card: 
       '#380d0d', text: '#ffebee' },

// --- Line 3857 ---
'#37474f': { name: 'Cinza Escuro', brand: '#37474f', bg: '#101416', panel: '#1c2327', card: 
       '#263238', text: '#eceff1' },

// --- Line 3858 ---
'#00838f': { name: 'Ciano', brand: '#00838f', bg: '#001416', panel: '#00262b', card: '#003339', 
       text: '#e0f7fa' },

// --- Line 3859 ---
'#ad1457': { name: 'Rosa Choque', brand: '#ad1457', bg: '#160209', panel: '#2b0512', card: 
       '#380617', text: '#fce4ec' },

// --- Line 3860 ---
'#00796b': { name: 'Verde �gua', brand: '#00796b', bg: '#001210', panel: '#00211f', card: 
       '#002e2b', text: '#e0f2f1' },

// --- Line 3861 ---
'#8d6e63': { name: 'Marrom Slate', brand: '#8d6e63', bg: '#18110f', panel: '#281e1b', card: 
       '#352924', text: '#efebe9' },

// --- Line 3862 ---
'#3f51b5': { name: '�ndigo', brand: '#3f51b5', bg: '#0a0b16', panel: '#13152c', card: 
       '#1c1f40', text: '#e8eaf6' },

// --- Line 3863 ---
'#ffb300': { name: 'Amarelo �mbar', brand: '#ffb300', bg: '#1c1400', panel: '#332500', card: 
       '#463300', text: '#fff8e1' },

// --- Line 3864 ---
'#827717': { name: 'Verde Lim�o', brand: '#827717', bg: '#121200', panel: '#222204', card: 
       '#313107', text: '#f9fbe7' },

// --- Line 3865 ---
'#d81b60': { name: 'Rosa Magenta', brand: '#d81b60', bg: '#1a000a', panel: '#320015', card: 
       '#44001d', text: '#fce4ec' },

// --- Line 3866 ---
'#673ab7': { name: 'Roxo Lavanda', brand: '#673ab7', bg: '#0e0618', panel: '#1d0e32', card: 
       '#281446', text: '#ede7f6' },

// --- Line 3867 ---
'#00c853': { name: 'Esmeralda', brand: '#00c853', bg: '#001a0a', panel: '#003314', card: 
       '#00481c', text: '#e8f5e9' },

// --- Line 3868 ---
'#ff007f': { name: 'Cyberpunk Neon', brand: '#ff007f', bg: '#0a000d', panel: '#1b0022', card: 
       '#270031', text: '#ffe5f2' },

// --- Line 3869 ---
'#00e676': { name: 'Menta Neon', brand: '#00e676', bg: '#001209', panel: '#002412', card: 
       '#00361b', text: '#e8fdf5' },

// --- Line 3870 ---
'#00b0ff': { name: 'Oceano Profundo', brand: '#00b0ff', bg: '#000a12', panel: '#001524', card: 
       '#00223b', text: '#e0f7ff' },

// --- Line 3871 ---
'#ec407a': { name: 'Rose Gold', brand: '#ec407a', bg: '#1a0a0f', panel: '#2e141c', card: 
       '#3f1b26', text: '#fce4ec' },

// --- Line 3872 ---
'#f43f5e': { name: 'P�r do Sol Violeta', brand: '#f43f5e', bg: '#18040d', panel: '#2d0a1b', 
       card: '#3e0f26', text: '#ffeef2' },

// --- Line 3873 ---
'#607d8b': { name: 'Grafite', brand: '#607d8b', bg: '#111618', panel: '#1e262a', card: 
       '#2a353c', text: '#eceff1' },

// --- Line 3874 ---
'#ff8f00': { name: '�mbar Dourado', brand: '#ff8f00', bg: '#1a0e00', panel: '#301a00', card: 
       '#442400', text: '#fff8e1' },

// --- Line 3875 ---
'#880e4f': { name: 'Ameixa Escura', brand: '#880e4f', bg: '#12020a', panel: '#240414', card: 
       '#33061d', text: '#fce4ec' }

// --- Line 3876 ---
};

// --- Line 3877 ---


// --- Line 3878 ---
function setBoardTheme(color) {

// --- Line 3879 ---
const r = document.querySelector(':root');

// --- Line 3880 ---
const safeColor = color || DEFAULT_THEME_COLOR;

// --- Line 3881 ---
const theme = THEMES[safeColor] || THEMES[DEFAULT_THEME_COLOR];

// --- Line 3882 ---


// --- Line 3883 ---
if (theme) {

// --- Line 3884 ---
r.style.setProperty('--brand', theme.brand);

// --- Line 3885 ---
r.style.setProperty('--bg', theme.bg);

// --- Line 3886 ---
r.style.setProperty('--panel', theme.panel);

// --- Line 3887 ---
r.style.setProperty('--card', theme.card);

// --- Line 3888 ---
r.style.setProperty('--ink', theme.text);

// --- Line 3889 ---
} else {

// --- Line 3890 ---
r.style.setProperty('--brand', safeColor);

// --- Line 3891 ---
r.style.setProperty('--bg', '#0f1a2a');

// --- Line 3892 ---
r.style.setProperty('--panel', '#0f223d');

// --- Line 3893 ---
r.style.setProperty('--card', '#112b4a');

// --- Line 3894 ---
r.style.setProperty('--ink', '#e9f1ff');

// --- Line 3895 ---
}

// --- Line 3898 ---
function getBoardColor(boardId) {

// --- Line 3899 ---
if (boardId === 'board-todos') {

// --- Line 3900 ---
const board = boardsMeta.find(b => b.id === 'board-todos');

// --- Line 3901 ---
return board ? board.color : DEFAULT_THEME_COLOR;

// --- Line 3902 ---
}

// --- Line 3903 ---
const board = boardsMeta.find(b => b.id === boardId);

// --- Line 3904 ---
return board ? board.color : DEFAULT_THEME_COLOR;

// --- Line 3905 ---
}

// --- Line 3906 ---


// --- Line 3907 ---
function openBoardThemePicker() {

// --- Line 3908 ---
const board = boardsMeta.find(b => b.id === currentBoardId);

// --- Line 3909 ---
if (!board) return;

// --- Line 3910 ---


// --- Line 3911 ---
showModal('Cor do Quadro', function () {

// --- Line 3912 ---
const grid = el('div');

// --- Line 3913 ---
grid.style.display = 'grid';

// --- Line 3914 ---
grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(130px, 1fr))';

// --- Line 3915 ---
grid.style.gap = '10px';

// --- Line 3916 ---


// --- Line 3917 ---
Object.values(THEMES).forEach(theme => {

// --- Line 3918 ---
const btn = el('button');

// --- Line 3919 ---
btn.textContent = theme.name;

// --- Line 3920 ---
btn.style.background = theme.brand;

// --- Line 3921 ---
btn.style.color = 'white';

// --- Line 3922 ---
btn.style.border = 'none';

// --- Line 3923 ---
btn.style.padding = '15px';

// --- Line 3924 ---
btn.style.borderRadius = '8px';

// --- Line 3925 ---
btn.style.cursor = 'pointer';

// --- Line 3926 ---
btn.style.fontWeight = 'bold';

// --- Line 3927 ---


// --- Line 3928 ---
btn.style.background = `linear-gradient(135deg, ${theme.bg} 0%, ${theme.brand} 100%)`;

// --- Line 3929 ---
btn.style.border = `1px solid ${theme.panel}`;

// --- Line 3930 ---


// --- Line 3931 ---
if (theme.brand.toLowerCase() === (board.color || DEFAULT_THEME_COLOR).toLowerCase()) {

// --- Line 3932 ---
btn.style.boxShadow = '0 0 0 2px #fff, 0 0 0 4px ' + theme.brand;

// --- Line 3933 ---
}

// --- Line 3934 ---


// --- Line 3935 ---
btn.onclick = function () {

// --- Line 3936 ---
board.color = theme.brand;

// --- Line 3937 ---
setBoardTheme(theme.brand);

// --- Line 3938 ---
saveBoardsMetadata();

// --- Line 3939 ---
document.querySelector('.modal-wrap').remove();

// --- Line 3940 ---
};

// --- Line 3941 ---
grid.appendChild(btn);

// --- Line 3942 ---
});

// --- Line 3943 ---
return grid;

// --- Line 3944 ---
}, function () { });

// --- Line 3945 ---
}

// --- Line 3946 ---


// --- Line 3947 ---
// (getBoardData removido pois n�o � mais usado da mesma forma, substituido por loadAndRenderAll)

// --- Line 3948 ---
function getBoardData(boardId) {

// --- Line 3949 ---
// Mantido para suporte legacy se precisar

// --- Line 3950 ---
try {

// --- Line 3951 ---
const str = localStorage.getItem(LS_BOARD_PREFIX + boardId);

// --- Line 3952 ---
return str ? JSON.parse(str) : [];

// --- Line 3953 ---
} catch (e) { return []; }

// --- Line 3954 ---
}

// --- Line 3955 ---


// --- Line 3956 ---
function moveCardToBoard(cardElement, targetBoardId, targetListTitle) {

// --- Line 3957 ---
if (!cardElement) return;

// --- Line 3958 ---


// --- Line 3959 ---
const targetBoardMeta = boardsMeta.find(b => b.id === targetBoardId);

// --- Line 3960 ---
const boardName = targetBoardMeta ? targetBoardMeta.name : 'Outro Quadro';

// --- Line 3961 ---
addCardHistory(cardElement, 'Movido para o quadro "' + boardName + '"');

// --- Line 3963 ---
const cardData = cardToData(cardElement);

// --- Line 3964 ---
// IMPORTANTE: Ao mover para outro quadro, remove a data (sai da agenda global)

// --- Line 3965 ---
// A menos que a gente quisesse manter, mas conceitualmente se vai pro kanban de l�, vira 
       backlog.

// --- Line 3966 ---
cardData.when = '';

// --- Line 3967 ---
cardData.boardId = targetBoardId;

// --- Line 3968 ---
cardData.color = getBoardColor(targetBoardId) || '';

// --- Line 3969 ---


// --- Line 3970 ---
const targetData = getBoardData(targetBoardId);

// --- Line 3971 ---
let moved = false;

// --- Line 3972 ---


// --- Line 3973 ---
let targetList = targetData.find(l => l.type === 'kanban' && l.title === targetListTitle);

// --- Line 3975 ---
if (!targetList && targetBoardId === 'board-trash') {

// --- Line 3976 ---
targetList = { type: 'kanban', title: 'Apagados', cards: [] };

// --- Line 3977 ---
targetData.push(targetList);

// --- Line 3978 ---
}

// --- Line 3979 ---


// --- Line 3980 ---
if (targetList) {

// --- Line 3981 ---
if (!targetList.cards) targetList.cards = [];

// --- Line 3982 ---
targetList.cards.push(cardData);

// --- Line 3983 ---
moved = true;

// --- Line 3984 ---
} else {

// --- Line 3985 ---
if (targetData.length > 0 && targetData[0].type === 'kanban') {

// --- Line 3986 ---
targetData[0].cards.push(cardData);

// --- Line 3987 ---
moved = true;

// --- Line 3988 ---
if (targetBoardId !== 'board-trash') {

// --- Line 3989 ---
alert(`Lista "${targetListTitle}" n�o encontrada. Movido para 
       "${targetData[0].title}".`);

// --- Line 3990 ---
}

// --- Line 3991 ---
} else {

// --- Line 3992 ---
targetData.unshift({ type: 'kanban', title: 'Inbox', cards: [cardData] });

// --- Line 3993 ---
moved = true;

// --- Line 3994 ---
}

// --- Line 3995 ---
}

// --- Line 3996 ---


// --- Line 3997 ---
if (moved) {

// --- Line 3998 ---
localStorage.setItem(LS_BOARD_PREFIX + targetBoardId, JSON.stringify(targetData));

// --- Line 3999 ---


// --- Line 4000 ---
const targetBoard = boardsMeta.find(b => b.id === targetBoardId);

// --- Line 4001 ---
if (targetBoard) { targetBoard.lastModified = Date.now(); saveBoardsMetadata(); }

// --- Line 4002 ---


// --- Line 4003 ---
if (isFirebaseReady && auth && auth.currentUser) {

// --- Line 4004 ---
db.ref('users/' + auth.currentUser.uid + '/boards/' + targetBoardId).set(targetData);

// --- Line 4005 ---
}

// --- Line 4006 ---


// --- Line 4007 ---
removeCard(cardElement, true);

// --- Line 4008 ---
// Persist cuida de salvar a remo��o no quadro atual E atualizar a agenda global se 
       necessario

// --- Line 4009 ---
persist();

// --- Line 4010 ---


// --- Line 4011 ---
const btn = document.createElement('div');

// --- Line 4012 ---
btn.textContent = `Card movido para quadro "${targetBoard ? targetBoard.name : 'Outro'}"`;

// --- Line 4013 ---
btn.style.position = 'fixed'; btn.style.bottom = '20px'; btn.style.left = '50%'; 
       btn.style.transform = 'translateX(-50%)';

// --- Line 4014 ---
btn.style.background = '#28a745'; btn.style.color = 'white'; btn.style.padding = '10px 
       20px'; btn.style.borderRadius = '5px'; btn.style.zIndex = '9999';

// --- Line 4015 ---
document.body.appendChild(btn);

// --- Line 4016 ---
setTimeout(() => btn.remove(), 3000);

// --- Line 4017 ---
}

// --- Line 4018 ---
}

// --- Line 4020 ---
function updateBoardSelectUI() {

// --- Line 4021 ---
const select = document.getElementById('boardSelect');

// --- Line 4022 ---
if (!select) return;

// --- Line 4023 ---


// --- Line 4024 ---
select.innerHTML = '';

// --- Line 4025 ---
const sortedBoards = [...boardsMeta].sort((a, b) => {

// --- Line 4026 ---
if (a.id === 'board-todos') return -1;

// --- Line 4027 ---
if (b.id === 'board-todos') return 1;

// --- Line 4028 ---
if (a.id === 'board-trash') return 1;

// --- Line 4029 ---
if (b.id === 'board-trash') return -1;

// --- Line 4030 ---
return a.name.localeCompare(b.name, 'pt', { sensitivity: 'base' });

// --- Line 4031 ---
});

// --- Line 4032 ---


// --- Line 4033 ---
sortedBoards.forEach(b => {

// --- Line 4034 ---
const opt = document.createElement('option');

// --- Line 4035 ---
opt.value = b.id;

// --- Line 4036 ---
opt.textContent = b.name;

// --- Line 4037 ---
if (b.id === currentBoardId) opt.selected = true;

// --- Line 4038 ---
select.appendChild(opt);

// --- Line 4039 ---
});

// --- Line 4040 ---
}

// --- Line 4042 ---
function distributeAndSaveTodos(mergedBoardData, agendaData) {

// --- Line 4043 ---
const vBoards = getVisibleBoardsInTodos();

// --- Line 4044 ---
let boardsDataMap = {};

// --- Line 4045 ---
boardsMeta.forEach(b => {

// --- Line 4046 ---
if (b.id === 'board-trash') return;

// --- Line 4047 ---
if (vBoards.has(b.id)) {

// --- Line 4048 ---
boardsDataMap[b.id] = [];

// --- Line 4049 ---
}

// --- Line 4050 ---
});

// --- Line 4051 ---
if (vBoards.has('board-todos') || boardsMeta.some(b => b.id === 'board-todos')) {

// --- Line 4052 ---
boardsDataMap['board-todos'] = [];

// --- Line 4053 ---
}

// --- Line 4054 ---


// --- Line 4055 ---
// First, initialize empty lists for boards associated with lists in DOM

// --- Line 4056 ---
mergedBoardData.forEach(list => {

// --- Line 4057 ---
if (list.type === 'kanban') {

// --- Line 4058 ---
const title = list.title;

// --- Line 4059 ---
const associatedBoards = new Set();

// --- Line 4060 ---
if (list.boardId && list.boardId !== 'board-todos') {

// --- Line 4061 ---
associatedBoards.add(list.boardId);

// --- Line 4062 ---
}

// --- Line 4063 ---
(list.cards || []).forEach(card => {

// --- Line 4064 ---
if (card.boardId && card.boardId !== 'board-trash') {

// --- Line 4065 ---
associatedBoards.add(card.boardId);

// --- Line 4066 ---
}

// --- Line 4067 ---
});

// --- Line 4068 ---
if (associatedBoards.size === 0) {

// --- Line 4069 ---
associatedBoards.add('board-todos');

// --- Line 4070 ---
}

// --- Line 4071 ---


// --- Line 4072 ---
associatedBoards.forEach(bId => {

// --- Line 4073 ---
if (boardsDataMap[bId]) {

// --- Line 4074 ---
boardsDataMap[bId].push({ type: 'kanban', title: title, cards: [] });

// --- Line 4075 ---
}

// --- Line 4076 ---
});

// --- Line 4077 ---
} else if (list.type === 'quad') {

// --- Line 4078 ---
const quad = list.quad;

// --- Line 4079 ---
Object.keys(boardsDataMap).forEach(bId => {

// --- Line 4080 ---
boardsDataMap[bId].push({ type: 'quad', quad: quad, cards: [] });

// --- Line 4081 ---
});

// --- Line 4082 ---
}

// --- Line 4083 ---
});

// --- Line 4084 ---


// --- Line 4085 ---
// Then, populate the cards in the corresponding lists

// --- Line 4086 ---
mergedBoardData.forEach(list => {

// --- Line 4087 ---
if (list.type === 'kanban') {

// --- Line 4088 ---
const title = list.title;

// --- Line 4089 ---
(list.cards || []).forEach(card => {

// --- Line 4090 ---
const bId = card.boardId || 'board-todos';

// --- Line 4091 ---
if (bId === 'board-trash') return;

// --- Line 4092 ---
if (boardsDataMap[bId]) {

// --- Line 4093 ---
let targetList = boardsDataMap[bId].find(l => l.type === 'kanban' && 
       l.title.toLowerCase().trim() === title.toLowerCase().trim());

// --- Line 4094 ---
if (!targetList) {

// --- Line 4095 ---
targetList = { type: 'kanban', title: title, cards: [] };

// --- Line 4096 ---
boardsDataMap[bId].push(targetList);

// --- Line 4097 ---
}

// --- Line 4098 ---
targetList.cards.push(card);

// --- Line 4099 ---
}

// --- Line 4100 ---
});

// --- Line 4101 ---
} else if (list.type === 'quad') {

// --- Line 4102 ---
const quad = list.quad;

// --- Line 4103 ---
(list.cards || []).forEach(card => {

// --- Line 4104 ---
const bId = card.boardId || 'board-todos';

// --- Line 4105 ---
if (bId === 'board-trash') return;

// --- Line 4106 ---
if (boardsDataMap[bId]) {

// --- Line 4107 ---
let targetList = boardsDataMap[bId].find(l => l.type === 'quad' && l.quad === 
       quad);

// --- Line 4108 ---
if (!targetList) {

// --- Line 4109 ---
targetList = { type: 'quad', quad: quad, cards: [] };

// --- Line 4110 ---
boardsDataMap[bId].push(targetList);

// --- Line 4111 ---
}

// --- Line 4112 ---
targetList.cards.push(card);

// --- Line 4113 ---
}

// --- Line 4114 ---
});

// --- Line 4115 ---
}

// --- Line 4116 ---
});

// --- Line 4117 ---


// --- Line 4118 ---
// Save only the boards that were in vBoards

// --- Line 4119 ---
Object.keys(boardsDataMap).forEach(bId => {

// --- Line 4120 ---
const boardJson = JSON.stringify(boardsDataMap[bId]);

// --- Line 4121 ---
localStorage.setItem(LS_BOARD_PREFIX + bId, boardJson);

// --- Line 4122 ---
if (isFirebaseReady && auth && auth.currentUser && !isRemoteUpdate) {

// --- Line 4123 ---
db.ref('users/' + auth.currentUser.uid + '/boards/' + bId).set(boardsDataMap[bId])

// --- Line 4124 ---
.catch(e => console.error("Firebase board save error for " + bId, e));

// --- Line 4125 ---
}

// --- Line 4126 ---
});

// --- Line 4127 ---


// --- Line 4128 ---
// Merge agenda cards of visible boards with hidden ones in global agenda

// --- Line 4129 ---
let finalAgendaData = agendaData;

// --- Line 4130 ---
try {

// --- Line 4131 ---
let existingAgenda = [];

// --- Line 4132 ---
const raw = localStorage.getItem(LS_GLOBAL_AGENDA);

// --- Line 4133 ---
if (raw) existingAgenda = JSON.parse(raw);

// --- Line 4134 ---


// --- Line 4135 ---
function getListKey(list) {

// --- Line 4136 ---
if (list.type === 'goal') return 'goal';

// --- Line 4137 ---
if (list.type === 'unscheduled') return 'unscheduled';

// --- Line 4138 ---
if (list.type === 'time') return 'time_' + list.time;

// --- Line 4139 ---
return 'unknown';

// --- Line 4140 ---
}

// --- Line 4141 ---


// --- Line 4142 ---
const serializedMap = {};

// --- Line 4143 ---
agendaData.forEach(list => {

// --- Line 4144 ---
serializedMap[getListKey(list)] = list;

// --- Line 4145 ---
});

// --- Line 4146 ---


// --- Line 4147 ---
const mergedAgenda = [];

// --- Line 4148 ---
existingAgenda.forEach(list => {

// --- Line 4149 ---
const key = getListKey(list);

// --- Line 4150 ---
const serializedList = serializedMap[key];

// --- Line 4151 ---


// --- Line 4152 ---
const hiddenCards = (list.cards || []).filter(c => !vBoards.has(c.boardId || 
       'board-todos'));

// --- Line 4153 ---
const visibleCards = serializedList ? (serializedList.cards || []) : [];

// --- Line 4154 ---
const mergedCards = hiddenCards.concat(visibleCards);

// --- Line 4155 ---


// --- Line 4156 ---
if (mergedCards.length > 0) {

// --- Line 4157 ---
mergedAgenda.push({

// --- Line 4158 ---
...list,

// --- Line 4159 ---
cards: mergedCards

// --- Line 4160 ---
});

// --- Line 4161 ---
}

// --- Line 4162 ---
delete serializedMap[key];

// --- Line 4163 ---
});

// --- Line 4165 ---
Object.keys(serializedMap).forEach(key => {

// --- Line 4166 ---
const list = serializedMap[key];

// --- Line 4167 ---
if (list.cards && list.cards.length > 0) {

// --- Line 4168 ---
mergedAgenda.push(list);

// --- Line 4169 ---
}

// --- Line 4170 ---
});

// --- Line 4171 ---


// --- Line 4172 ---
finalAgendaData = mergedAgenda;

// --- Line 4173 ---
} catch (e) {

// --- Line 4174 ---
console.error("Error merging global agenda in distributeAndSaveTodos:", e);

// --- Line 4175 ---
}

// --- Line 4176 ---


// --- Line 4177 ---
const agendaJson = JSON.stringify(finalAgendaData);

// --- Line 4178 ---
localStorage.setItem(LS_GLOBAL_AGENDA, agendaJson);

// --- Line 4179 ---
if (isFirebaseReady && auth && auth.currentUser && !isRemoteUpdate) {

// --- Line 4180 ---
db.ref('users/' + auth.currentUser.uid + '/global/agenda').set(finalAgendaData)

// --- Line 4181 ---
.catch(e => console.error("Firebase agenda save error:", e));

// --- Line 4182 ---
}

// --- Line 4183 ---
}

// --- Line 4184 ---


// --- Line 4185 ---
function saveImmediately() {

// --- Line 4186 ---
if (__persistTick) {

// --- Line 4187 ---
clearTimeout(__persistTick);

// --- Line 4188 ---
__persistTick = null;

// --- Line 4189 ---
}

// --- Line 4190 ---
if (__muteHistory > 0) return;

// --- Line 4191 ---
try {

// --- Line 4192 ---
const { boardData, agendaData } = serializeAndSeparate();

// --- Line 4193 ---
if (currentBoardId === 'board-todos') {

// --- Line 4194 ---
distributeAndSaveTodos(boardData, agendaData);

// --- Line 4195 ---
} else {

// --- Line 4196 ---
const boardJson = JSON.stringify(boardData);

// --- Line 4197 ---
const agendaJson = JSON.stringify(agendaData);

// --- Line 4198 ---
if (currentBoardId) {

// --- Line 4199 ---
localStorage.setItem(LS_BOARD_PREFIX + currentBoardId, boardJson);

// --- Line 4200 ---
const board = boardsMeta.find(b => b.id === currentBoardId);

// --- Line 4201 ---
if (board) {

// --- Line 4202 ---
board.lastModified = Date.now();

// --- Line 4203 ---
saveBoardsMetadata();

// --- Line 4204 ---
}

// --- Line 4205 ---
}

// --- Line 4206 ---
localStorage.setItem(LS_GLOBAL_AGENDA, agendaJson);

// --- Line 4207 ---
if (isFirebaseReady && auth && auth.currentUser && !isRemoteUpdate) {

// --- Line 4208 ---
db.ref('users/' + auth.currentUser.uid + '/boards/' + currentBoardId).set(boardData)

// --- Line 4209 ---
.catch(e => console.error("Firebase board save error:", e));

// --- Line 4210 ---
db.ref('users/' + auth.currentUser.uid + '/global/agenda').set(agendaData)

// --- Line 4211 ---
.catch(e => console.error("Firebase agenda save error:", e));

// --- Line 4212 ---
}

// --- Line 4213 ---
}

// --- Line 4214 ---
} catch (e) { }

// --- Line 4215 ---
capture();

// --- Line 4216 ---
}

// --- Line 4217 ---


// --- Line 4218 ---
function persist() {

// --- Line 4219 ---
if (__muteHistory > 0) return;

// --- Line 4220 ---
clearTimeout(__persistTick);

// --- Line 4221 ---
__persistTick = setTimeout(saveImmediately, 250);

// --- Line 4222 ---
}

// --- Line 4223 ---


// --- Line 4224 ---
function duplicateCards(cards) {

// --- Line 4225 ---
if (!cards || !cards.length) return;

// --- Line 4226 ---


// --- Line 4227 ---
// Group selected cards by their parent list (.cards container)

// --- Line 4228 ---
const groupedByParent = new Map();

// --- Line 4229 ---
cards.forEach(c => {

// --- Line 4230 ---
const parent = c.parentElement;

// --- Line 4231 ---
if (!groupedByParent.has(parent)) groupedByParent.set(parent, []);

// --- Line 4232 ---
groupedByParent.get(parent).push(c);

// --- Line 4233 ---
});

// --- Line 4234 ---


// --- Line 4235 ---
groupedByParent.forEach((cardList, parent) => {

// --- Line 4236 ---
if (!parent) {

// --- Line 4237 ---
cardList.forEach(c => {

// --- Line 4238 ---
var newData = cardToData(c);

// --- Line 4239 ---
createCard(newData);

// --- Line 4240 ---
});

// --- Line 4241 ---
return;

// --- Line 4242 ---
}

// --- Line 4243 ---
// Find the last selected card in this parent to insert after

// --- Line 4244 ---
const lastOriginalCard = cardList[cardList.length - 1];

// --- Line 4245 ---
let insertReference = lastOriginalCard.nextSibling;

// --- Line 4246 ---


// --- Line 4247 ---
cardList.forEach(c => {

// --- Line 4248 ---
var newData = cardToData(c);

// --- Line 4249 ---
if (!c.closest('#agenda-sidebar')) {

// --- Line 4250 ---
newData.when = '';

// --- Line 4251 ---
}

// --- Line 4252 ---
var newCard = createCard(newData);

// --- Line 4253 ---
// Insert after the current reference, then update reference to the newly inserted card

// --- Line 4254 ---
// so they are grouped together.

// --- Line 4255 ---
parent.insertBefore(newCard, insertReference);

// --- Line 4256 ---
insertReference = newCard.nextSibling;

// --- Line 4257 ---
});

// --- Line 4258 ---
});

// --- Line 4260 ---
persist();

// --- Line 4261 ---
updateSlotsHasItems();

// --- Line 4262 ---
updateTotalTimerDisplay();

// --- Line 4263 ---
}

// --- Line 4264 ---


// --- Line 4265 ---
function updateTimerDisplay(card) {

// --- Line 4266 ---
var disp = card.querySelector('.timer-display');

// --- Line 4267 ---
if (!disp) return;

// --- Line 4268 ---
var progressBar = card.querySelector('.timer-progress-bar');

// --- Line 4269 ---
var totalSeconds = parseInt(card.dataset.timerTotal || '0', 10);

// --- Line 4270 ---


// --- Line 4271 ---
card.classList.remove('timer-running', 'timer-finished', 'timer-paused');

// --- Line 4272 ---


// --- Line 4273 ---
if (totalSeconds > 0) {

// --- Line 4274 ---
var state = card.dataset.timerState || 'stopped';

// --- Line 4275 ---
var seconds = parseInt(card.dataset.timerLeft, 10);

// --- Line 4276 ---
if (isNaN(seconds)) seconds = totalSeconds;

// --- Line 4277 ---


// --- Line 4278 ---
var mins = Math.floor(seconds / 60);

// --- Line 4279 ---
var secs = seconds % 60;

// --- Line 4280 ---
disp.textContent = `?? ${to2(mins)}:${to2(secs)}`;

// --- Line 4281 ---


// --- Line 4282 ---
// Atualiza Barra de Progresso

// --- Line 4283 ---
if (progressBar) {

// --- Line 4284 ---
var perc = (seconds / totalSeconds) * 100;

// --- Line 4285 ---
progressBar.style.width = perc + '%';

// --- Line 4286 ---
}

// --- Line 4287 ---


// --- Line 4288 ---
if (state === 'running') {

// --- Line 4289 ---
disp.textContent = `?? ${to2(mins)}:${to2(secs)}`;

// --- Line 4290 ---
disp.style.color = '#66bb6a';

// --- Line 4291 ---
disp.style.background = 'rgba(102, 187, 106, 0.2)';

// --- Line 4292 ---
card.classList.add('timer-running');

// --- Line 4293 ---
}

// --- Line 4294 ---
else if (state === 'paused') { 

// --- Line 4295 ---
disp.textContent = `?? ${to2(mins)}:${to2(secs)}`;

// --- Line 4296 ---
disp.style.color = '#ffa726'; 

// --- Line 4297 ---
disp.style.background = 'rgba(255, 167, 38, 0.2)'; 

// --- Line 4298 ---
card.classList.add('timer-paused');

// --- Line 4299 ---
}

// --- Line 4300 ---
else if (state === 'finished') {

// --- Line 4301 ---
disp.textContent = `?? 00:00`;

// --- Line 4302 ---
disp.style.color = '#ef5350';

// --- Line 4303 ---
disp.style.background = 'rgba(239, 83, 80, 0.2)';

// --- Line 4304 ---
card.classList.add('timer-finished');

// --- Line 4305 ---
if (progressBar) progressBar.style.width = '100%';

// --- Line 4306 ---
}

// --- Line 4307 ---
else {

// --- Line 4308 ---
var totalMins = Math.round(totalSeconds / 60);

// --- Line 4309 ---
disp.textContent = `? ${totalMins} min`;

// --- Line 4310 ---
disp.style.color = ''; disp.style.background = 'rgba(0,0,0,.2)';

// --- Line 4311 ---
if (progressBar) progressBar.style.width = '0%';

// --- Line 4312 ---
}

// --- Line 4313 ---
} else {

// --- Line 4314 ---
disp.textContent = '';

// --- Line 4315 ---
}

// --- Line 4318 ---
// --- REINSERIDO C�DIGO FALTANTE DA FUN��O TOGGLE ---

// --- Line 4319 ---
function toggleCardCompletion(e) {

// --- Line 4320 ---
e.stopPropagation();

// --- Line 4321 ---
const card = e.target.closest('.card');

// --- Line 4322 ---
if (!card) return;

// --- Line 4323 ---
const isCompleted = card.dataset.completed === 'true';

// --- Line 4324 ---
card.dataset.completed = isCompleted ? 'false' : 'true';

// --- Line 4325 ---


// --- Line 4326 ---
if (card.dataset.completed === 'true') {

// --- Line 4327 ---
card.classList.remove('timer-finished');

// --- Line 4328 ---
if (card.dataset.timerState === 'finished') {

// --- Line 4329 ---
card.dataset.timerState = 'stopped';

// --- Line 4330 ---
}

// --- Line 4331 ---
}

// --- Line 4332 ---


// --- Line 4333 ---
persist();

// --- Line 4334 ---
updateTimerDisplay(card);

// --- Line 4335 ---
}

// --- Line 4336 ---


// --- Line 4337 ---
function paintCard(c) {

// --- Line 4338 ---
var boardColor = getBoardColor(c.dataset.boardId) || c.dataset.color;

// --- Line 4339 ---
c.style.borderColor = '';

// --- Line 4340 ---
c.style.borderLeftColor = '';

// --- Line 4341 ---
if (boardColor) {

// --- Line 4342 ---
c.style.setProperty('--board-color', boardColor);

// --- Line 4343 ---
} else {

// --- Line 4344 ---
c.style.setProperty('--board-color', '#20486f');

// --- Line 4345 ---
}

// --- Line 4346 ---


// --- Line 4347 ---
var labelColor = c.dataset.labelColor || '';

// --- Line 4348 ---
var header = c.querySelector('.card-header');

// --- Line 4349 ---
if (header) {

// --- Line 4350 ---
if (labelColor) {

// --- Line 4351 ---
header.style.backgroundColor = labelColor;

// --- Line 4352 ---
header.style.setProperty('--label-color', labelColor);

// --- Line 4353 ---
header.style.borderBottom = 'none';

// --- Line 4354 ---
} else {

// --- Line 4355 ---
header.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';

// --- Line 4356 ---
header.style.setProperty('--label-color', 'transparent');

// --- Line 4357 ---
header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';

// --- Line 4358 ---
}

// --- Line 4359 ---
}

// --- Line 4360 ---


// --- Line 4361 ---
var dot = c.querySelector('.dot');

// --- Line 4362 ---
if (dot) {

// --- Line 4363 ---
dot.style.borderColor = boardColor || '#375b86';

// --- Line 4364 ---
if (c.dataset.completed === 'true') {

// --- Line 4365 ---
dot.style.background = '#66bb6a';

// --- Line 4366 ---
dot.style.borderColor = '#66bb6a';

// --- Line 4367 ---
} else {

// --- Line 4368 ---
dot.style.background = 'rgba(0, 0, 0, 0.2)';

// --- Line 4371 ---


// --- Line 4372 ---
var dateEl = c.querySelector('.due-date');

// --- Line 4373 ---
if (c.dataset.due) {

// --- Line 4374 ---
if (!dateEl) {

// --- Line 4375 ---
dateEl = el('span', 'due-date');

// --- Line 4376 ---
if (header) {

// --- Line 4377 ---
header.insertBefore(dateEl, header.querySelector('.kebab'));

// --- Line 4378 ---
} else {

// --- Line 4379 ---
c.appendChild(dateEl);

// --- Line 4380 ---
}

// --- Line 4381 ---
}

// --- Line 4382 ---
try {

// --- Line 4383 ---
const [y, m, d] = c.dataset.due.split('-');

// --- Line 4384 ---
dateEl.textContent = '?? ' + d + '/' + m;

// --- Line 4385 ---
} catch (e) {

// --- Line 4386 ---
dateEl.textContent = '?? ' + c.dataset.due;

// --- Line 4387 ---
}

// --- Line 4388 ---
dateEl.style.display = '';

// --- Line 4389 ---
} else if (dateEl) {

// --- Line 4390 ---
dateEl.style.display = 'none';

// --- Line 4391 ---
}

// --- Line 4392 ---
if (currentBoardId === 'board-todos') {

// --- Line 4393 ---
const cardBoardId = c.dataset.boardId;

// --- Line 4394 ---
const board = boardsMeta.find(b => b.id === cardBoardId);

// --- Line 4395 ---
if (board) {

// --- Line 4396 ---
c.setAttribute('title', 'Quadro: ' + board.name);

// --- Line 4397 ---
} else {

// --- Line 4398 ---
c.removeAttribute('title');

// --- Line 4399 ---
}

// --- Line 4400 ---
} else {

// --- Line 4401 ---
c.removeAttribute('title');

// --- Line 4402 ---
}

// --- Line 4403 ---
updateTimerDisplay(c);

// --- Line 4404 ---
}

// --- Line 4405 ---


// --- Line 4406 ---
function createCard(data) {

// --- Line 4407 ---
var _d = (typeof data === 'string') ? { text: data } : (data || { text: '' });

// --- Line 4408 ---
if (!_d.history) {

// --- Line 4409 ---
_d.history = JSON.stringify([{ action: 'Criado', time: Date.now() }]);

// --- Line 4410 ---
}

// --- Line 4411 ---
var c = el('div', 'card'); c.draggable = true;

// --- Line 4412 ---


// --- Line 4413 ---
const cardBoardId = _d.boardId || currentBoardId || 'board-todos';

// --- Line 4414 ---
c.dataset.boardId = cardBoardId;

// --- Line 4415 ---
c.dataset.color = _d.color || getBoardColor(cardBoardId) || '';

// --- Line 4416 ---
c.dataset.labelColor = _d.labelColor || '';

// --- Line 4417 ---
c.dataset.due = _d.due || ''; c.dataset.when = _d.when || '';

// --- Line 4418 ---
c.dataset.timerTotal = _d.timerTotal || ''; c.dataset.timerLeft = _d.timerLeft || ''; 
       c.dataset.timerState = _d.timerState || 'stopped';

// --- Line 4419 ---
c.dataset.timerEnd = _d.timerEnd || '';

// --- Line 4420 ---
c.dataset.completed = _d.completed || 'false';

// --- Line 4421 ---
c.dataset.history = _d.history || '[]';

// --- Line 4422 ---
c.dataset.description = _d.description || '';

// --- Line 4423 ---
c.dataset.duration = _d.duration || '';

// --- Line 4424 ---
c.dataset.recurrence = _d.recurrence || 'none';

// --- Line 4425 ---
const cardId = _d.cardId || 'card_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);

// --- Line 4426 ---
c.dataset.cardId = cardId;

// --- Line 4427 ---
if (window._selectedIdsToRestore && window._selectedIdsToRestore.has(cardId)) {

// --- Line 4428 ---
selected.add(c);

// --- Line 4429 ---
c.classList.add('selected');

// --- Line 4430 ---
}

// --- Line 4431 ---
c.dataset.recurrenceParent = _d.recurrenceParent || '';

// --- Line 4432 ---
c.dataset.alertEnabled = _d.alertEnabled || 'false';

// --- Line 4433 ---
c.dataset.alertValue = _d.alertValue || '15';

// --- Line 4434 ---
c.dataset.alertUnit = _d.alertUnit || 'minutos';

// --- Line 4435 ---
c.dataset.alertFired = _d.alertFired || 'false';

// --- Line 4436 ---


// --- Line 4437 ---
// Create Card Header

// --- Line 4438 ---
var header = el('div', 'card-header');

// --- Line 4439 ---


// --- Line 4440 ---
var chkWrap = el('span', 'card-checkbox-wrapper');

// --- Line 4441 ---
var dot = el('span', 'dot');

// --- Line 4442 ---
var dotCheck = el('span', 'dot-check'); dotCheck.textContent = '?';

// --- Line 4443 ---
dot.appendChild(dotCheck);

// --- Line 4444 ---
chkWrap.appendChild(dot);

// --- Line 4445 ---


// --- Line 4446 ---
var timerDisp = el('span', 'timer-display');

// --- Line 4447 ---


// --- Line 4448 ---
header.appendChild(chkWrap);

// --- Line 4449 ---
header.appendChild(timerDisp);

// --- Line 4450 ---


// --- Line 4451 ---
var kb = el('button', 'kebab'); kb.type = 'button'; kb.textContent = '?';

// --- Line 4452 ---
kb.addEventListener('click', function (ev) {

// --- Line 4453 ---
ev.stopPropagation();

// --- Line 4454 ---
clearSelection();

// --- Line 4455 ---
addSelection(c);

// --- Line 4456 ---
var r = kb.getBoundingClientRect();

// --- Line 4457 ---
showCtx(r.right, r.bottom, c);

// --- Line 4458 ---
});

// --- Line 4459 ---
header.appendChild(kb);

// --- Line 4460 ---


// --- Line 4461 ---
// Create Card Body

// --- Line 4462 ---
var body = el('div', 'card-body');

// --- Line 4463 ---
var t = el('span', 'text'); t.textContent = _d.text || '';

// --- Line 4464 ---
body.appendChild(t);

// --- Line 4465 ---


// --- Line 4466 ---
// Container da barra de progresso

// --- Line 4467 ---
var progCont = el('div', 'timer-progress-container');

// --- Line 4468 ---
var progBar = el('div', 'timer-progress-bar');

// --- Line 4469 ---
progCont.appendChild(progBar);

// --- Line 4470 ---


// --- Line 4471 ---
c.appendChild(header);

// --- Line 4472 ---
c.appendChild(body);

// --- Line 4473 ---
c.appendChild(progCont);

// --- Line 4474 ---


// --- Line 4475 ---
paintCard(c);

// --- Line 4476 ---


// --- Line 4477 ---
dot.addEventListener('click', toggleCardCompletion);

// --- Line 4478 ---
dot.addEventListener('dblclick', (e) => e.stopPropagation());

// --- Line 4479 ---


// --- Line 4480 ---
c.addEventListener('mousedown', function (e) {

// --- Line 4481 ---
if (e.button !== 0) return;

// --- Line 4482 ---
if (isSelectionMode) {

// --- Line 4483 ---
e.preventDefault();

// --- Line 4484 ---
toggleSelection(c);

// --- Line 4485 ---
return;

// --- Line 4486 ---
}

// --- Line 4487 ---
if (e.shiftKey) { rangeSelect(c); } else if (e.ctrlKey || e.metaKey) { toggleSelection(c); 
       } else if (!selected.has(c)) { clearSelection(); addSelection(c); }

// --- Line 4488 ---
updateTotalTimerDisplay();

// --- Line 4489 ---
});

// --- Line 4490 ---


// --- Line 4491 ---
c.addEventListener('dragstart', function (e) {

// --- Line 4492 ---
e.stopPropagation();

// --- Line 4493 ---
var block = selected.has(c) ? Array.from(selected) : [c];

// --- Line 4494 ---
dragState = { leader: c, block: block };

// --- Line 4495 ---
block.forEach(function (n) { n.classList.add('dragging'); });

// --- Line 4496 ---
pushPH();

// --- Line 4497 ---
try { e.dataTransfer.setData('text/plain', 'drag'); e.dataTransfer.effectAllowed = 'move'; 
       } catch (_) { }

// --- Line 4498 ---
});

// --- Line 4499 ---


// --- Line 4500 ---
c.addEventListener('dragend', function () {

// --- Line 4501 ---
if (dragState && dragState.block) {

// --- Line 4502 ---
dragState.block.forEach(function (n) { n.classList.remove('dragging'); });

// --- Line 4503 ---
}

// --- Line 4504 ---
cleanupPH();

// --- Line 4505 ---
dragState = null;

// --- Line 4506 ---
persist();

// --- Line 4507 ---
updateSlotsHasItems();

// --- Line 4508 ---
updateTotalTimerDisplay();

// --- Line 4509 ---
});

// --- Line 4510 ---


// --- Line 4511 ---
c.addEventListener('dblclick', function (e) {

// --- Line 4512 ---
if (e.target.closest('.dot') || e.target.closest('.kebab')) {

// --- Line 4513 ---
e.stopPropagation();

// --- Line 4514 ---
return;

// --- Line 4515 ---
}

// --- Line 4516 ---
handleCardDblClick(c);

// --- Line 4517 ---
});

// --- Line 4518 ---


// --- Line 4519 ---
c.addEventListener('contextmenu', function (e) {

// --- Line 4520 ---
e.preventDefault();

// --- Line 4521 ---
e.stopPropagation();

// --- Line 4522 ---
clearSelection();

// --- Line 4523 ---
addSelection(c);

// --- Line 4524 ---
showCtx(e.clientX, e.clientY, c);

// --- Line 4525 ---
});

// --- Line 4526 ---


// --- Line 4527 ---
if (!allCards.includes(c)) {

// --- Line 4528 ---
allCards.push(c);

// --- Line 4529 ---
}

// --- Line 4530 ---
updateTotalTimerDisplay();

// --- Line 4531 ---
return c;

// --- Line 4532 ---
}

// --- Line 4533 ---


// --- Line 4534 ---
function removeCard(c, bypassTrash = false) {

// --- Line 4535 ---
if (currentBoardId !== 'board-trash' && !bypassTrash) {

// --- Line 4536 ---
addCardHistory(c, 'Enviado para a lixeira');

// --- Line 4537 ---
moveCardToBoard(c, 'board-trash', 'Apagados');

// --- Line 4538 ---
return;

// --- Line 4539 ---
}

// --- Line 4540 ---
const parentId = c.dataset.cardId;

// --- Line 4541 ---
if (parentId) {

// --- Line 4542 ---
allCards = allCards.filter(card => {

// --- Line 4543 ---
if (card.dataset.recurrenceParent === parentId) {

// --- Line 4544 ---
card.remove();

// --- Line 4545 ---
return false;

// --- Line 4546 ---
}

// --- Line 4547 ---
return true;

// --- Line 4548 ---
});

// --- Line 4549 ---
}

// --- Line 4550 ---
var index = allCards.indexOf(c);

// --- Line 4551 ---
if (index > -1) allCards.splice(index, 1);

// --- Line 4552 ---
c.remove();

// --- Line 4553 ---
persist();

// --- Line 4554 ---
updateSlotsHasItems();

// --- Line 4555 ---
updateTotalTimerDisplay();

// --- Line 4556 ---
}

// --- Line 4557 ---


// --- Line 4558 ---
function startInlineEdit(card, isNewCard = false) {

// --- Line 4559 ---
var tEl = card.querySelector('.text'); if (!tEl) return; if 
       (card.classList.contains('editing')) return;

// --- Line 4560 ---
card.classList.add('editing'); var original = tEl.textContent; 
       tEl.setAttribute('contenteditable', 'true'); tEl.focus();

// --- Line 4561 ---
var sel = window.getSelection();

// --- Line 4562 ---
var range = document.createRange();

// --- Line 4563 ---
range.selectNodeContents(tEl);

// --- Line 4564 ---
range.collapse(false);

// --- Line 4565 ---
sel.removeAllRanges();

// --- Line 4566 ---
sel.addRange(range);

// --- Line 4567 ---


// --- Line 4568 ---
function finish(save) {

// --- Line 4569 ---
tEl.removeEventListener('keydown', onKey);

// --- Line 4570 ---
tEl.removeEventListener('blur', onBlur);

// --- Line 4571 ---
tEl.removeAttribute('contenteditable');

// --- Line 4572 ---
card.classList.remove('editing');

// --- Line 4573 ---


// --- Line 4574 ---
const quickConfigToggle = document.getElementById('quickConfigToggle');

// --- Line 4575 ---
const textWasEmpty = original.trim() === '';

// --- Line 4576 ---
const textIsNowEmpty = tEl.textContent.trim() === '';

// --- Line 4577 ---


// --- Line 4578 ---
const targetCard = card._originalReference || card;

// --- Line 4579 ---


// --- Line 4580 ---
if (!save) {

// --- Line 4581 ---
tEl.textContent = original;

// --- Line 4582 ---
if (textWasEmpty && textIsNowEmpty) {

// --- Line 4583 ---
removeCard(targetCard, true);

// --- Line 4584 ---
if (card._originalReference) renderWeeklyView();

// --- Line 4585 ---
}

// --- Line 4586 ---
} else if (textIsNowEmpty) {

// --- Line 4587 ---
if (!textWasEmpty) {

// --- Line 4588 ---
showConfirm('Excluir cart�o vazio?', function () {

// --- Line 4589 ---
removeCard(targetCard, true);

// --- Line 4590 ---
if (card._originalReference) renderWeeklyView();

// --- Line 4591 ---
});

// --- Line 4592 ---
} else {

// --- Line 4593 ---
removeCard(targetCard, true);

// --- Line 4594 ---
if (card._originalReference) renderWeeklyView();

// --- Line 4595 ---
}

// --- Line 4596 ---
} else {

// --- Line 4597 ---
if (card._originalReference) {

// --- Line 4598 ---
const origText = card._originalReference.querySelector('.text');

// --- Line 4599 ---
if (origText) origText.textContent = tEl.textContent;

// --- Line 4600 ---
}

// --- Line 4601 ---
persist();

// --- Line 4602 ---
if (isNewCard && quickConfigToggle && quickConfigToggle.checked) {

// --- Line 4603 ---
openTimerDialog([targetCard], function () {

// --- Line 4604 ---
setTimeout(function () {

// --- Line 4605 ---
openColorDialog([targetCard]);

// --- Line 4606 ---
if (card._originalReference) renderWeeklyView();

// --- Line 4607 ---
}, 1);

// --- Line 4608 ---
});

// --- Line 4609 ---
} else {

// --- Line 4610 ---
if (card._originalReference) renderWeeklyView();

// --- Line 4611 ---
}

// --- Line 4612 ---
}

// --- Line 4613 ---
}

// --- Line 4614 ---
function onKey(ev) {

// --- Line 4615 ---
if (ev.key === 'Escape') {

// --- Line 4616 ---
ev.preventDefault();

// --- Line 4617 ---
finish(false);

// --- Line 4618 ---
}

// --- Line 4619 ---
if (ev.key === 'Enter' && !ev.shiftKey) {

// --- Line 4620 ---
ev.preventDefault();

// --- Line 4621 ---
finish(true);

// --- Line 4622 ---
}

// --- Line 4623 ---
}

// --- Line 4624 ---
function onBlur() { finish(true); }

// --- Line 4625 ---
tEl.addEventListener('keydown', onKey);

// --- Line 4626 ---
tEl.addEventListener('blur', onBlur);

// --- Line 4627 ---
}

// --- Line 4628 ---


// --- Line 4629 ---


// --- Line 4630 ---
function startGlobalTimer() {

// --- Line 4631 ---
if (globalTimerInterval) return;

// --- Line 4632 ---
globalTimerInterval = setInterval(function () {

// --- Line 4633 ---
var activeTimers = false;

// --- Line 4634 ---
allCards.forEach(function (c) {

// --- Line 4635 ---
if (c.dataset.timerState === 'running') {

// --- Line 4636 ---
activeTimers = true;

// --- Line 4637 ---
var now = Date.now();

// --- Line 4638 ---
var end = parseInt(c.dataset.timerEnd, 10);

// --- Line 4639 ---
if (isNaN(end)) {

// --- Line 4640 ---
c.dataset.timerState = 'paused';

// --- Line 4641 ---
return;

// --- Line 4642 ---
}

// --- Line 4643 ---
var left = Math.round((end - now) / 1000);

// --- Line 4644 ---
if (left <= 0) {

// --- Line 4645 ---
c.dataset.timerState = 'finished';

// --- Line 4646 ---
c.dataset.timerLeft = 0;

// --- Line 4647 ---
c.style.animation = '';

// --- Line 4648 ---
playBeep(); // <--- ALERTA SONORO

// --- Line 4649 ---
} else {

// --- Line 4650 ---
c.dataset.timerLeft = left;

// --- Line 4651 ---
}

// --- Line 4652 ---
updateTimerDisplay(c);

// --- Line 4653 ---
updateFocusMode();

// --- Line 4654 ---
}

// --- Line 4655 ---
});

// --- Line 4656 ---
if (!activeTimers) {

// --- Line 4657 ---
clearInterval(globalTimerInterval);

// --- Line 4658 ---
globalTimerInterval = null;

// --- Line 4659 ---
}

// --- Line 4660 ---
}, 1000);

// --- Line 4661 ---
}

// --- Line 4662 ---


// --- Line 4663 ---
let alertCheckInterval = null;

// --- Line 4664 ---
function startAlertCheck() {

// --- Line 4665 ---
if (alertCheckInterval) return;

// --- Line 4666 ---


// --- Line 4667 ---
// Set up styles for toast if not exists

// --- Line 4668 ---
if (!document.getElementById('toast-styles')) {

// --- Line 4669 ---
const style = document.createElement('style');

// --- Line 4670 ---
style.id = 'toast-styles';

// --- Line 4671 ---
style.textContent = `

// --- Line 4672 ---
@keyframes slideInRight {

// --- Line 4673 ---
from { transform: translateX(120%); opacity: 0; }

// --- Line 4674 ---
to { transform: translateX(0); opacity: 1; }

// --- Line 4675 ---
}

// --- Line 4676 ---
`;

// --- Line 4677 ---
document.head.appendChild(style);

// --- Line 4678 ---
}

// --- Line 4679 ---


// --- Line 4680 ---
alertCheckInterval = setInterval(function () {

// --- Line 4681 ---
const now = Date.now();

// --- Line 4682 ---
let anyFired = false;

// --- Line 4683 ---
allCards.forEach(c => {

// --- Line 4684 ---
if (c.dataset.alertEnabled === 'true' && c.dataset.alertFired !== 'true') {

// --- Line 4685 ---
const whenVal = c.dataset.when || '';

// --- Line 4686 ---
if (whenVal.includes('T')) {

// --- Line 4687 ---
const parts = whenVal.split('T');

// --- Line 4688 ---
const cardDate = parts[0];

// --- Line 4689 ---
const cardTime = parts[1] || '';

// --- Line 4690 ---
if (cardTime && cardTime !== 'GOAL' && /^\d{2}:\d{2}$/.test(cardTime)) {

// --- Line 4691 ---
const eventDate = new Date(cardDate + 'T' + cardTime + ':00');

// --- Line 4692 ---
if (!isNaN(eventDate.getTime())) {

// --- Line 4693 ---
const val = parseInt(c.dataset.alertValue || '15', 10);

// --- Line 4694 ---
const unit = c.dataset.alertUnit || 'minutos';

// --- Line 4695 ---
let factor = 60 * 1000;

// --- Line 4696 ---
if (unit === 'horas') factor = 60 * 60 * 1000;

// --- Line 4697 ---
else if (unit === 'dias') factor = 24 * 60 * 60 * 1000;

// --- Line 4698 ---
else if (unit === 'semanas') factor = 7 * 24 * 60 * 60 * 1000;

// --- Line 4699 ---


// --- Line 4700 ---
const alertTime = eventDate.getTime() - (val * factor);

// --- Line 4701 ---
if (now >= alertTime && now < eventDate.getTime() + 10 * 60 * 1000) {

// --- Line 4702 ---
c.dataset.alertFired = 'true';

// --- Line 4703 ---
anyFired = true;

// --- Line 4704 ---
playBeep();

// --- Line 4705 ---
setTimeout(playBeep, 200);

// --- Line 4706 ---


// --- Line 4707 ---
showNotificationToast((c.querySelector('.text') ? 
       c.querySelector('.text').textContent : '').trim(), cardTime);

// --- Line 4708 ---
}

// --- Line 4709 ---
}

// --- Line 4710 ---
}

// --- Line 4711 ---
}

// --- Line 4712 ---
}

// --- Line 4713 ---
});

// --- Line 4714 ---
if (anyFired) {

// --- Line 4715 ---
persist();

// --- Line 4716 ---
}

// --- Line 4717 ---
}, 10000); // Check every 10 seconds for responsive alerting

// --- Line 4718 ---
}

// --- Line 4719 ---


// --- Line 4720 ---
function showNotificationToast(taskTitle, taskTime) {

// --- Line 4721 ---
const toast = document.createElement('div');

// --- Line 4722 ---
toast.style.position = 'fixed';

// --- Line 4723 ---
toast.style.top = '20px';

// --- Line 4724 ---
toast.style.right = '20px';

// --- Line 4725 ---
toast.style.background = 'var(--panel)';

// --- Line 4726 ---
toast.style.color = '#fff';

// --- Line 4727 ---
toast.style.borderLeft = '4px solid var(--brand)';

// --- Line 4728 ---
toast.style.padding = '12px 18px';

// --- Line 4729 ---
toast.style.borderRadius = '8px';

// --- Line 4730 ---
toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';

// --- Line 4731 ---
toast.style.zIndex = '10000';

// --- Line 4732 ---
toast.style.display = 'flex';

// --- Line 4733 ---
toast.style.flexDirection = 'column';

// --- Line 4734 ---
toast.style.gap = '4px';

// --- Line 4735 ---
toast.style.minWidth = '280px';

// --- Line 4736 ---
toast.style.fontFamily = 'system-ui, -apple-system, sans-serif';

// --- Line 4737 ---
toast.style.animation = 'slideInRight 0.3s ease-out';

// --- Line 4738 ---


// --- Line 4739 ---
toast.innerHTML = `

// --- Line 4740 ---
<div style="display:flex; justify-content:space-between; align-items:center;">

// --- Line 4741 ---
<strong style="color:#ffb300; font-size:12px; letter-spacing: 0.5px;">? ALERTA DE 
       COMPROMISSO</strong>

// --- Line 4742 ---
<button style="background:transparent; border:none; color:#9fb3d2; font-size:16px; 
       cursor:pointer;" onclick="this.closest('.toast-container').remove()">�</button>

// --- Line 4743 ---
</div>

// --- Line 4744 ---
<div style="font-size:14px; font-weight:500; margin-top:2px;">${taskTitle || 'Tarefa sem 
       t�tulo'}</div>

// --- Line 4745 ---
<div style="font-size:12px; color:#9fb3d2; margin-top:2px;">�s ${taskTime}</div>

// --- Line 4746 ---
`;

// --- Line 4747 ---
toast.className = 'toast-container';

// --- Line 4748 ---
document.body.appendChild(toast);

// --- Line 4749 ---
setTimeout(() => {

// --- Line 4750 ---
toast.style.transition = 'opacity 0.5s, transform 0.5s';

// --- Line 4751 ---
toast.style.opacity = '0';

// --- Line 4752 ---
toast.style.transform = 'translateY(-20px)';

// --- Line 4753 ---
setTimeout(() => toast.remove(), 500);

// --- Line 4754 ---
}, 8000);

// --- Line 4755 ---
}

// --- Line 4757 ---
function handleCardDblClick(c) {

// --- Line 4758 ---
var state = c.dataset.timerState || 'stopped';

// --- Line 4759 ---
var total = parseInt(c.dataset.timerTotal || '0', 10);

// --- Line 4760 ---
if (total === 0) {

// --- Line 4761 ---
startInlineEdit(c);

// --- Line 4762 ---
return;

// --- Line 4763 ---
}

// --- Line 4764 ---


// --- Line 4765 ---
if (state === 'running') { // Pause

// --- Line 4766 ---
c.dataset.timerState = 'paused';

// --- Line 4767 ---
var now = Date.now();

// --- Line 4768 ---
var end = parseInt(c.dataset.timerEnd, 10);

// --- Line 4769 ---
c.dataset.timerLeft = Math.round((end - now) / 1000);

// --- Line 4770 ---
} else { // Start or resume

// --- Line 4771 ---
c.dataset.timerState = 'running';

// --- Line 4772 ---
var left = parseInt(c.dataset.timerLeft, 10);

// --- Line 4773 ---
if (state === 'finished' || left <= 0) left = total;

// --- Line 4774 ---
c.dataset.timerEnd = Date.now() + left * 1000;

// --- Line 4775 ---
c.style.animation = '';

// --- Line 4776 ---
startGlobalTimer();

// --- Line 4777 ---
}

// --- Line 4778 ---
updateTimerDisplay(c);

// --- Line 4779 ---
persist();

// --- Line 4780 ---
}

// --- Line 4781 ---


// --- Line 4782 ---
// ===== DnD =====

// --- Line 4783 ---
var dragState = null; var draggingList = null; var lastAnchor = null;

// --- Line 4784 ---
function syncMirrors() {

// --- Line 4785 ---
$$('.mirror-card').forEach(m => {

// --- Line 4786 ---
if (m._originalReference) {

// --- Line 4787 ---
m.classList.toggle('selected', selected.has(m._originalReference));

// --- Line 4788 ---
}

// --- Line 4789 ---
});

// --- Line 4790 ---
}

// --- Line 4791 ---
function clearSelection() { 

// --- Line 4792 ---
selected.forEach(function (c) { c.classList.remove('selected'); }); 

// --- Line 4793 ---
selected.clear(); 

// --- Line 4794 ---
syncMirrors();

// --- Line 4795 ---
updateTotalTimerDisplay(); 

// --- Line 4796 ---
}

// --- Line 4797 ---
function addSelection(c) { 

// --- Line 4798 ---
if (!c) return;

// --- Line 4799 ---
if (!selected.has(c)) { 

// --- Line 4800 ---
selected.add(c); 

// --- Line 4801 ---
c.classList.add('selected'); 

// --- Line 4802 ---
lastAnchor = c; 

// --- Line 4803 ---
syncMirrors();

// --- Line 4804 ---
} 

// --- Line 4805 ---
updateTotalTimerDisplay(); 

// --- Line 4806 ---
}

// --- Line 4807 ---
function toggleSelection(c) { 

// --- Line 4808 ---
if (!c) return;

// --- Line 4809 ---
if (selected.has(c)) { 

// --- Line 4810 ---
selected.delete(c); 

// --- Line 4811 ---
c.classList.remove('selected'); 

// --- Line 4812 ---
} else { 

// --- Line 4813 ---
addSelection(c); 

// --- Line 4814 ---
} 

// --- Line 4815 ---
syncMirrors();

// --- Line 4816 ---
updateTotalTimerDisplay(); 

// --- Line 4817 ---
}

// --- Line 4818 ---
function rangeSelect(to) {

// --- Line 4819 ---
if (!lastAnchor) { addSelection(to); return; }

// --- Line 4820 ---
var cards = Array.from(document.querySelectorAll('.card'));

// --- Line 4821 ---
var visibleCards = cards.filter(c => c.style.display !== 'none' && c.offsetHeight > 0);

// --- Line 4822 ---
var a = visibleCards.indexOf(lastAnchor);

// --- Line 4823 ---
var b = visibleCards.indexOf(to);

// --- Line 4824 ---
if (a === -1 || b === -1) {

// --- Line 4825 ---
addSelection(to);

// --- Line 4826 ---
return;

// --- Line 4827 ---
}

// --- Line 4828 ---
var start = Math.min(a, b);

// --- Line 4829 ---
var end = Math.max(a, b);

// --- Line 4830 ---
clearSelection();

// --- Line 4831 ---
for (var k = start; k <= end; k++) {

// --- Line 4832 ---
addSelection(visibleCards[k]);

// --- Line 4833 ---
}

// --- Line 4834 ---
syncMirrors();

// --- Line 4835 ---
updateTotalTimerDisplay();

// --- Line 4836 ---
}

// --- Line 4837 ---


// --- Line 4838 ---
function toggleSelectionMode() {

// --- Line 4839 ---
isSelectionMode = !isSelectionMode;

// --- Line 4840 ---
const btn = document.getElementById('toggleSelectionModeBtn');

// --- Line 4841 ---
if (btn) btn.classList.toggle('active', isSelectionMode);

// --- Line 4842 ---
if (!isSelectionMode) clearSelection();

// --- Line 4843 ---
}

// --- Line 4844 ---
function getSelectionOr(target) { return selected.size ? Array.from(selected) : (target ? [target] 
       : []); }

// --- Line 4845 ---
function pushPH() { if (!dragState) dragState = {}; var ph = el('div', 'placeholder'); 
       dragState.placeholder = ph; return ph; }

// --- Line 4846 ---
function cleanupPH() { if (dragState && dragState.placeholder) dragState.placeholder.remove(); }

// --- Line 4847 ---
function nearestAfter(container, y) { var els = 
       [].slice.call(container.querySelectorAll('.card:not(.dragging)')); var best = { offset: -Infinity, element: 
       null }; els.forEach(function (child) { var r = child.getBoundingClientRect(); var o = y - (r.top + r.height / 
       2); if (o < 0 && o > best.offset) best = { offset: o, element: child }; }); return best.element; }

// --- Line 4848 ---


// --- Line 4849 ---
function wireDropZone(container) {

// --- Line 4850 ---
var isSlot = container.classList.contains('slot') || container.classList.contains('goal-slot');

// --- Line 4851 ---
var cardsContainer = isSlot ? container.querySelector('.cards') : container;

// --- Line 4852 ---


// --- Line 4853 ---
function handleDrop(e) {

// --- Line 4854 ---
if (!dragState) return;

// --- Line 4855 ---
e.preventDefault(); e.stopPropagation();

// --- Line 4856 ---


// --- Line 4857 ---
var parent = dragState.placeholder.parentElement || cardsContainer;

// --- Line 4858 ---
var ref = dragState.placeholder;

// --- Line 4859 ---
var block = (dragState.block && dragState.block.length) ? dragState.block : 
       [dragState.leader];

// --- Line 4860 ---


// --- Line 4861 ---
applyWhen(container, block);

// --- Line 4862 ---


// --- Line 4863 ---
let targetListTitle = 'Agenda/Outro';

// --- Line 4864 ---
const listEl = container.closest('.list');

// --- Line 4865 ---
if (listEl) {

// --- Line 4866 ---
const titleInp = listEl.querySelector('.title');

// --- Line 4867 ---
targetListTitle = titleInp ? titleInp.value : (listEl.dataset.quad || listEl.id || 
       listEl.dataset.time || 'Agenda');

// --- Line 4868 ---
}

// --- Line 4869 ---
block.forEach(function (n) { addCardHistory(n, 'Movido para a lista "' + targetListTitle + 
       '"'); });

// --- Line 4870 ---


// --- Line 4871 ---
if (!isSlot) {

// --- Line 4872 ---
block.forEach(function (n) { parent.insertBefore(n, ref); });

// --- Line 4873 ---
}

// --- Line 4874 ---


// --- Line 4875 ---
if (dragState.block) { dragState.block.forEach(function (n) { 
       n.classList.remove('dragging'); }); }

// --- Line 4876 ---
cleanupPH();

// --- Line 4877 ---
if (isSlot) container.classList.remove('hover');

// --- Line 4878 ---
dragState = null;

// --- Line 4879 ---


// --- Line 4880 ---
updateSlotsHasItems();

// --- Line 4881 ---
persist();

// --- Line 4882 ---
updateTotalTimerDisplay();

// --- Line 4883 ---
}

// --- Line 4884 ---


// --- Line 4885 ---
function handleDragOver(e) {

// --- Line 4886 ---
if (!dragState) return;

// --- Line 4887 ---
e.preventDefault();

// --- Line 4888 ---
var after = nearestAfter(cardsContainer, e.clientY);

// --- Line 4889 ---
var ph = dragState.placeholder;

// --- Line 4890 ---
if (!after) cardsContainer.appendChild(ph);

// --- Line 4891 ---
else cardsContainer.insertBefore(ph, after);

// --- Line 4892 ---
if (isSlot) container.classList.add('hover');

// --- Line 4893 ---
}

// --- Line 4895 ---
container.addEventListener('dragover', handleDragOver);

// --- Line 4896 ---
container.addEventListener('drop', handleDrop);

// --- Line 4897 ---
if (isSlot) {

// --- Line 4898 ---
container.addEventListener('dragleave', function () { container.classList.remove('hover'); 
       });

// --- Line 4899 ---
}

// --- Line 4900 ---
}

// --- Line 4901 ---


// --- Line 4902 ---
function applyWhen(listElement, nodes) {

// --- Line 4903 ---
const day = getActiveDay();

// --- Line 4904 ---
let targetWhen = '';

// --- Line 4905 ---


// --- Line 4906 ---
const EISENHOWER_COLORS = {

// --- Line 4907 ---
Q1: '#2e7d32', // Green (Fa�a)

// --- Line 4908 ---
Q2: '#1976d2', // Blue (Agende)

// --- Line 4909 ---
Q3: '#ffb300', // Yellow (Delegue)

// --- Line 4910 ---
Q4: '#c62828'  // Red (Elimine)

// --- Line 4911 ---
};

// --- Line 4912 ---


// --- Line 4913 ---
const listEl = listElement ? (listElement.closest('.list') || listElement) : null;

// --- Line 4914 ---


// --- Line 4915 ---
let isMatrix = listEl && listEl.dataset.type === 'quad';

// --- Line 4916 ---
let quad = isMatrix ? listEl.dataset.quad : '';

// --- Line 4917 ---


// --- Line 4918 ---
if (listEl && listEl.dataset.date) {

// --- Line 4919 ---
targetWhen = listEl.dataset.date + 'T';

// --- Line 4920 ---
} else if (listEl && listEl.dataset.type === 'time') {

// --- Line 4921 ---
targetWhen = day + 'T' + listEl.dataset.time;

// --- Line 4922 ---
} else if (listEl && listEl.dataset.type === 'goal') {

// --- Line 4923 ---
targetWhen = day + 'TGOAL';

// --- Line 4924 ---
} else if (listEl && listEl.closest('.unscheduled-slot')) {

// --- Line 4925 ---
targetWhen = day + 'T';

// --- Line 4926 ---
} else {

// --- Line 4927 ---
targetWhen = '';

// --- Line 4928 ---
}

// --- Line 4929 ---


// --- Line 4930 ---
nodes.forEach(function (n) {

// --- Line 4931 ---
if (n._originalReference) {

// --- Line 4932 ---
n = n._originalReference;

// --- Line 4933 ---
}

// --- Line 4934 ---
const oldBadge = n.querySelector('.info-badge');

// --- Line 4935 ---
if (oldBadge) oldBadge.remove();

// --- Line 4936 ---


// --- Line 4937 ---
if (isMatrix && quad) {

// --- Line 4938 ---
n.dataset.labelColor = EISENHOWER_COLORS[quad];

// --- Line 4939 ---
}

// --- Line 4940 ---


// --- Line 4941 ---
const cardInCache = allCards.find(card => card === n);

// --- Line 4942 ---
if (cardInCache) {

// --- Line 4943 ---
cardInCache.dataset.when = targetWhen;

// --- Line 4944 ---
if (isMatrix && quad) {

// --- Line 4945 ---
cardInCache.dataset.labelColor = EISENHOWER_COLORS[quad];

// --- Line 4946 ---
}

// --- Line 4947 ---
} else {

// --- Line 4948 ---
n.dataset.when = targetWhen;

// --- Line 4949 ---
}

// --- Line 4950 ---
paintCard(n);

// --- Line 4951 ---
});

// --- Line 4952 ---
}

// --- Line 4953 ---


// --- Line 4954 ---
boardEl.addEventListener('dragover', function (e) { if (!draggingList) return; e.preventDefault(); 
       var after = listAfter(boardEl, e.clientX); if (after == null) boardEl.appendChild(draggingList); else 
       boardEl.insertBefore(draggingList, after); });

// --- Line 4955 ---
function listAfter(container, x) { var els = 
       [].slice.call(container.querySelectorAll('.list:not(.dragging)')); var best = { offset: -Infinity, element: 
       null }; els.forEach(function (ch) { var r = ch.getBoundingClientRect(); var o = x - (r.left + r.width / 2); if 
       (o < 0 && o > best.offset) best = { offset: o, element: ch }; }); return best.element; }

// --- Line 4956 ---


// --- Line 4957 ---
// ===== Listas =====

// --- Line 4958 ---
function createList(title) {

// --- Line 4959 ---
var list = el('section', 'list');

// --- Line 4960 ---
list.dataset.type = 'kanban';

// --- Line 4961 ---
list.dataset.boardId = currentBoardId;

// --- Line 4962 ---
var h = el('header');

// --- Line 4963 ---
var t = el('input', 'title');

// --- Line 4964 ---
t.value = title || 'Nova lista';

// --- Line 4965 ---
var addBtn = el('button', 'add-btn-minimal');

// --- Line 4966 ---
addBtn.textContent = '+';

// --- Line 4967 ---
addBtn.title = 'Novo Cart�o';

// --- Line 4968 ---
addBtn.onclick = function (e) {

// --- Line 4969 ---
e.stopPropagation();

// --- Line 4970 ---
var card = createCard({ text: '' });

// --- Line 4971 ---
var cardsContainer = list.querySelector('.cards');

// --- Line 4972 ---
cardsContainer.prepend(card);

// --- Line 4973 ---
startInlineEdit(card, true);

// --- Line 4974 ---
};

// --- Line 4975 ---
var more = el('button', 'more');

// --- Line 4976 ---
more.type = 'button'; more.textContent = '?';

// --- Line 4977 ---
more.addEventListener('click', function (ev) { ev.stopPropagation(); var r = 
       more.getBoundingClientRect(); showListCtx(r.right, r.bottom, list); });

// --- Line 4978 ---
h.appendChild(t); h.appendChild(addBtn); h.appendChild(more);

// --- Line 4979 ---
list.appendChild(h);

// --- Line 4980 ---
var cards = el('div', 'cards');

// --- Line 4981 ---
list.appendChild(cards);

// --- Line 4982 ---
wireDropZone(cards);

// --- Line 4983 ---
var add = el('div', 'add'); list.appendChild(add);

// --- Line 4984 ---
boardEl.appendChild(list);

// --- Line 4985 ---
h.draggable = true;

// --- Line 4986 ---
h.addEventListener('dragstart', function (ev) { draggingList = list; 
       list.classList.add('dragging'); if (ev.dataTransfer) ev.dataTransfer.setData('text/plain', 'list'); });

// --- Line 4987 ---
h.addEventListener('dragend', function () { draggingList = null; 
       list.classList.remove('dragging'); persist(); });

// --- Line 4988 ---
h.addEventListener('contextmenu', function (e) { e.preventDefault(); showListCtx(e.clientX, 
       e.clientY, list); });

// --- Line 4989 ---
return list;

// --- Line 4990 ---
}

// --- Line 4991 ---


// --- Line 4992 ---
function ensureMatrix() {

// --- Line 4993 ---
matrixEl.innerHTML = '';

// --- Line 4994 ---
var corner = el('div', 'axis corner'); corner.style.gridArea = '1 / 1'; 
       matrixEl.appendChild(corner);

// --- Line 4995 ---
var axX1 = el('div', 'axis'); axX1.textContent = 'URGENTE'; axX1.style.gridArea = '1 / 2'; 
       matrixEl.appendChild(axX1);

// --- Line 4996 ---
var axX2 = el('div', 'axis'); axX2.textContent = 'N�O URGENTE'; axX2.style.gridArea = '1 / 3'; 
       matrixEl.appendChild(axX2);

// --- Line 4997 ---
var axY1 = el('div', 'axis axis-y'); axY1.textContent = 'IMPORTANTE'; axY1.style.gridArea = '2 
       / 1'; matrixEl.appendChild(axY1);

// --- Line 4998 ---
var axY2 = el('div', 'axis axis-y'); axY2.textContent = 'N�O IMPORTANTE'; axY2.style.gridArea = 
       '3 / 1'; matrixEl.appendChild(axY2);

// --- Line 4999 ---


// --- Line 5000 ---
var specs = [

// --- Line 5001 ---
{ quad: 'Q1', label: 'FA�A AGORA', area: '2 / 2' },

// --- Line 5002 ---
{ quad: 'Q2', label: 'AGENDE', area: '2 / 3' },

// --- Line 5003 ---
{ quad: 'Q3', label: 'DELEGUE', area: '3 / 2' },

// --- Line 5004 ---
{ quad: 'Q4', label: 'ELIMINE', area: '3 / 3' }

// --- Line 5005 ---
];

// --- Line 5006 ---
specs.forEach(function (sp) {

// --- Line 5007 ---
var l = el('section', 'list');

// --- Line 5008 ---
l.dataset.type = 'quad'; l.dataset.quad = sp.quad; l.style.gridArea = sp.area;

// --- Line 5009 ---
var h = el('header');

// --- Line 5010 ---
var t = el('div', 'quad-label'); t.textContent = sp.label;

// --- Line 5011 ---
var addBtn = el('button', 'add-btn-minimal');

// --- Line 5012 ---
addBtn.textContent = '+';

// --- Line 5013 ---
addBtn.title = 'Novo Cart�o';

// --- Line 5014 ---
addBtn.onclick = function (e) {

// --- Line 5015 ---
e.stopPropagation();

// --- Line 5016 ---
var card = createCard({ text: '' });

// --- Line 5017 ---
const EISENHOWER_COLORS = { Q1: '#2e7d32', Q2: '#1976d2', Q3: '#ffb300', Q4: '#c62828' 
       };

// --- Line 5018 ---
card.dataset.labelColor = EISENHOWER_COLORS[sp.quad] || '';

// --- Line 5019 ---
paintCard(card);

// --- Line 5020 ---
var cardsContainer = l.querySelector('.cards');

// --- Line 5021 ---
cardsContainer.prepend(card);

// --- Line 5022 ---
startInlineEdit(card, true);

// --- Line 5023 ---
};

// --- Line 5024 ---
h.appendChild(t); h.appendChild(addBtn);

// --- Line 5025 ---
var cs = el('div', 'cards');

// --- Line 5026 ---
wireDropZone(cs);

// --- Line 5027 ---
l.appendChild(h); l.appendChild(cs);

// --- Line 5028 ---
matrixEl.appendChild(l);

// --- Line 5029 ---
});

// --- Line 5030 ---
}

// --- Line 5031 ---


// --- Line 5032 ---
function ensureSchedule() {

// --- Line 5033 ---
if (slotsRoot.querySelector('.goal-slot')) return;

// --- Line 5034 ---
var goalSlot = el('section', 'list goal-slot');

// --- Line 5035 ---
goalSlot.dataset.type = 'goal';

// --- Line 5036 ---
var goalHead = el('div', 'head');

// --- Line 5037 ---
var goalLabel = el('span', 'goal-label'); goalLabel.textContent = '?? OBJETIVO DO DIA';

// --- Line 5038 ---
var goalAdd = el('button', 'add-btn-minimal');

// --- Line 5039 ---
goalAdd.textContent = '+';

// --- Line 5040 ---
goalAdd.onclick = function (e) {

// --- Line 5041 ---
e.stopPropagation();

// --- Line 5042 ---
var card = createCard({ text: '', when: getActiveDay() + 'TGOAL' });

// --- Line 5043 ---
goalSlot.querySelector('.cards').prepend(card);

// --- Line 5044 ---
startInlineEdit(card, true);

// --- Line 5045 ---
};

// --- Line 5046 ---
goalHead.appendChild(goalLabel); goalHead.appendChild(goalAdd);

// --- Line 5047 ---
goalSlot.appendChild(goalHead);

// --- Line 5048 ---
var goalCards = el('div', 'cards');

// --- Line 5049 ---
goalSlot.appendChild(goalCards);

// --- Line 5050 ---
wireDropZone(goalSlot);

// --- Line 5051 ---
slotsRoot.appendChild(goalSlot);

// --- Line 5052 ---


// --- Line 5053 ---
var unscheduledSlot = el('section', 'list unscheduled-slot');

// --- Line 5054 ---
unscheduledSlot.dataset.type = 'unscheduled';

// --- Line 5055 ---
unscheduledSlot.id = 'unscheduled-bucket';

// --- Line 5056 ---
var uHead = el('div', 'head');

// --- Line 5057 ---
var uLabel = el('span', 'unscheduled-label'); uLabel.textContent = '?? HOR�RIO A DEFINIR';

// --- Line 5058 ---
var uAdd = el('button', 'add-btn-minimal');

// --- Line 5059 ---
uAdd.textContent = '+';

// --- Line 5060 ---
uAdd.onclick = function (e) {

// --- Line 5061 ---
e.stopPropagation();

// --- Line 5062 ---
var card = createCard({ text: '', when: getActiveDay() + 'T' });

// --- Line 5063 ---
unscheduledSlot.querySelector('.cards').prepend(card);

// --- Line 5064 ---
startInlineEdit(card, true);

// --- Line 5065 ---
updateSlotsHasItems();

// --- Line 5066 ---
};

// --- Line 5067 ---
uHead.appendChild(uLabel); uHead.appendChild(uAdd);

// --- Line 5068 ---
unscheduledSlot.appendChild(uHead);

// --- Line 5069 ---
var uCards = el('div', 'cards');

// --- Line 5070 ---
unscheduledSlot.appendChild(uCards);

// --- Line 5071 ---
wireDropZone(unscheduledSlot);

// --- Line 5072 ---
slotsRoot.appendChild(unscheduledSlot);

// --- Line 5074 ---
for (var h = 6; h <= 23; h++) {

// --- Line 5075 ---
for (var m = 0; m <= 30; m += 30) {

// --- Line 5076 ---
if (h === 23 && m === 30) break;

// --- Line 5077 ---
var t = to2(h) + ':' + to2(m);

// --- Line 5078 ---
var slot = el('section', 'list slot');

// --- Line 5079 ---
slot.dataset.type = 'time'; slot.dataset.time = t;

// --- Line 5080 ---
var head = el('div', 'head');

// --- Line 5081 ---
var label = el('span', 'time'); label.textContent = t;

// --- Line 5082 ---
head.appendChild(label);

// --- Line 5083 ---
slot.appendChild(head);

// --- Line 5084 ---
var cards = el('div', 'cards');

// --- Line 5085 ---
slot.appendChild(cards);

// --- Line 5086 ---
wireDropZone(slot);

// --- Line 5087 ---
slotsRoot.appendChild(slot);

// --- Line 5088 ---
}

// --- Line 5089 ---
}

// --- Line 5090 ---
var date = document.getElementById('agendaDate');

// --- Line 5091 ---
if (date && !date.value) { date.value = new Date().toISOString().slice(0, 10); }

// --- Line 5092 ---
}

// --- Line 5093 ---


// --- Line 5094 ---
const addUnscheduledBtn = document.getElementById('addUnscheduledBtn');

// --- Line 5095 ---
if (addUnscheduledBtn) {

// --- Line 5096 ---
addUnscheduledBtn.onclick = function () {

// --- Line 5097 ---
const unscheduledSlot = document.getElementById('unscheduled-bucket');

// --- Line 5098 ---
if (unscheduledSlot) {

// --- Line 5099 ---
var card = createCard({ text: '', when: getActiveDay() + 'T' });

// --- Line 5100 ---
unscheduledSlot.querySelector('.cards').prepend(card);

// --- Line 5101 ---
startInlineEdit(card, true);

// --- Line 5102 ---
updateSlotsHasItems();

// --- Line 5103 ---
}

// --- Line 5104 ---
};

// --- Line 5105 ---
}

// --- Line 5106 ---


// --- Line 5107 ---
function getActiveDay() { var i = document.getElementById('agendaDate'); return (i && i.value) ? 
       i.value : new Date().toISOString().slice(0, 10); }

// --- Line 5109 ---
function updateSlotsHasItems() {

// --- Line 5110 ---
const day = getActiveDay();

// --- Line 5111 ---
const dayPrefixGoal = day + 'TGOAL';

// --- Line 5112 ---
const dayPrefixTime = day + 'T';

// --- Line 5113 ---
const visibleCardsInSlots = new Set();

// --- Line 5114 ---


// --- Line 5115 ---
const goalSlot = slotsRoot.querySelector('.goal-slot');

// --- Line 5116 ---
const goalCardsContainer = goalSlot.querySelector('.cards');

// --- Line 5117 ---
goalCardsContainer.innerHTML = '';

// --- Line 5118 ---
let goalHasVisible = false;

// --- Line 5119 ---
allCards.forEach(card => {

// --- Line 5120 ---
if (card.dataset.when === dayPrefixGoal && cardPassesFilters(card)) {

// --- Line 5121 ---
goalCardsContainer.appendChild(card);

// --- Line 5122 ---
goalHasVisible = true;

// --- Line 5123 ---
visibleCardsInSlots.add(card);

// --- Line 5124 ---
}

// --- Line 5125 ---
});

// --- Line 5126 ---
goalSlot.classList.toggle('has-items', goalHasVisible);

// --- Line 5127 ---


// --- Line 5128 ---
const unscheduledSlot = document.getElementById('unscheduled-bucket');

// --- Line 5129 ---
const unscheduledContainer = unscheduledSlot.querySelector('.cards');

// --- Line 5130 ---
unscheduledContainer.innerHTML = '';

// --- Line 5131 ---
let unscheduledHasVisible = false;

// --- Line 5132 ---
const exactUnscheduledMatch = day + 'T';

// --- Line 5133 ---
allCards.forEach(card => {

// --- Line 5134 ---
if (card.dataset.when === exactUnscheduledMatch && cardPassesFilters(card)) {

// --- Line 5135 ---
unscheduledContainer.appendChild(card);

// --- Line 5136 ---
unscheduledHasVisible = true;

// --- Line 5137 ---
visibleCardsInSlots.add(card);

// --- Line 5138 ---
}

// --- Line 5139 ---
});

// --- Line 5140 ---
if (unscheduledHasVisible) {

// --- Line 5141 ---
unscheduledSlot.classList.add('has-items');

// --- Line 5142 ---
unscheduledSlot.style.display = 'flex';

// --- Line 5143 ---
} else {

// --- Line 5144 ---
unscheduledSlot.classList.remove('has-items');

// --- Line 5145 ---
unscheduledSlot.style.display = 'none';

// --- Line 5146 ---
}

// --- Line 5147 ---


// --- Line 5148 ---
$$('.list.slot', schedule).forEach(function (slot) {

// --- Line 5149 ---
if (slot.id === 'unscheduled-bucket') return;

// --- Line 5150 ---
const time = slot.dataset.time;

// --- Line 5151 ---
const cardsContainer = slot.querySelector('.cards');

// --- Line 5152 ---
cardsContainer.innerHTML = '';

// --- Line 5153 ---
let slotHasVisible = false;

// --- Line 5154 ---
const targetWhen = dayPrefixTime + time;

// --- Line 5155 ---
allCards.forEach(card => {

// --- Line 5156 ---
if (card.dataset.when === targetWhen && cardPassesFilters(card)) {

// --- Line 5157 ---
cardsContainer.appendChild(card);

// --- Line 5158 ---
slotHasVisible = true;

// --- Line 5159 ---
visibleCardsInSlots.add(card);

// --- Line 5160 ---
}

// --- Line 5161 ---
});

// --- Line 5162 ---
slot.classList.toggle('has-items', slotHasVisible);

// --- Line 5163 ---
});

// --- Line 5164 ---


// --- Line 5165 ---
$$('.board .card, .matrix .card').forEach(card => {

// --- Line 5166 ---
if (visibleCardsInSlots.has(card)) {

// --- Line 5167 ---
card.style.display = 'none';

// --- Line 5168 ---
} else if (cardPassesFilters(card)) {

// --- Line 5169 ---
card.style.display = '';

// --- Line 5170 ---
} else {

// --- Line 5171 ---
card.style.display = 'none';

// --- Line 5172 ---
}

// --- Line 5173 ---
});

// --- Line 5174 ---
updateTotalTimerDisplay();

// --- Line 5175 ---
renderWeeklyView();

// --- Line 5176 ---
}

// --- Line 5178 ---
// ===== Filtros & MENUS (ENCHUGADOS) =====

// --- Line 5179 ---
var selectedColors = new Set();

// --- Line 5180 ---
var LS_VISIBLE_BOARDS = 'tea-planner-visible-boards-in-todos';

// --- Line 5181 ---
var visibleBoardsInTodos = null;

// --- Line 5182 ---


// --- Line 5183 ---
function getVisibleBoardsInTodos() {

// --- Line 5184 ---
try {

// --- Line 5185 ---
const stored = localStorage.getItem(LS_VISIBLE_BOARDS);

// --- Line 5186 ---
if (stored) {

// --- Line 5187 ---
const parsed = JSON.parse(stored);

// --- Line 5188 ---
if (Array.isArray(parsed)) {

// --- Line 5189 ---
const validIds = parsed.filter(id => boardsMeta.some(b => b.id === id));

// --- Line 5190 ---
if (validIds.length > 0) {

// --- Line 5191 ---
visibleBoardsInTodos = new Set(validIds);

// --- Line 5192 ---
return visibleBoardsInTodos;

// --- Line 5193 ---
}

// --- Line 5194 ---
}

// --- Line 5195 ---
}

// --- Line 5196 ---
} catch (e) {}

// --- Line 5197 ---
visibleBoardsInTodos = new Set(boardsMeta.map(b => b.id).filter(id => id !== 'board-trash' && 
       id !== 'board-todos'));

// --- Line 5198 ---
return visibleBoardsInTodos;

// --- Line 5199 ---
}

// --- Line 5200 ---
function parseTime(timeStr) {

// --- Line 5201 ---
if (!timeStr) return 0;

// --- Line 5202 ---
var totalMinutes = 0;

// --- Line 5203 ---
var hoursMatch = timeStr.match(/(\d+)\s*h/);

// --- Line 5204 ---
var minutesMatch = timeStr.match(/(\d+)\s*m/);

// --- Line 5205 ---
if (hoursMatch) totalMinutes += parseInt(hoursMatch[1], 10) * 60;

// --- Line 5206 ---
if (minutesMatch) totalMinutes += parseInt(minutesMatch[1], 10);

// --- Line 5207 ---
if (!hoursMatch && !minutesMatch && /^\d+$/.test(timeStr)) totalMinutes = parseInt(timeStr, 10);

// --- Line 5208 ---
return totalMinutes;

// --- Line 5209 ---
}

// --- Line 5210 ---
function cardPassesFilters(c) {

// --- Line 5211 ---
var fFrom = (document.getElementById('fFrom').value) || '';

// --- Line 5212 ---
var fTo = (document.getElementById('fTo').value) || '';

// --- Line 5213 ---
var fTime = document.getElementById('fTime').value;

// --- Line 5214 ---
var ok = true;

// --- Line 5215 ---
if (selectedColors.size > 0) { ok = ok && selectedColors.has((c.dataset.labelColor || 
       '').toLowerCase()); }

// --- Line 5216 ---
if (fFrom) { ok = ok && (!!c.dataset.due && c.dataset.due >= fFrom); }

// --- Line 5217 ---
if (fTo) { ok = ok && (!!c.dataset.due && c.dataset.due <= fTo); }

// --- Line 5218 ---
if (fTime) {

// --- Line 5219 ---
var maxMins = parseTime(fTime);

// --- Line 5220 ---
var cardMins = Math.round(parseInt(c.dataset.timerTotal || '0', 10) / 60);

// --- Line 5221 ---
ok = ok && (cardMins > 0 && cardMins <= maxMins);

// --- Line 5222 ---
}

// --- Line 5223 ---
return ok;

// --- Line 5224 ---
}

// --- Line 5225 ---


// --- Line 5226 ---
function applyFilters() {

// --- Line 5227 ---
let visibleCount = 0;

// --- Line 5228 ---
allCards.forEach(function (c) {

// --- Line 5229 ---
const passesGeneralFilters = cardPassesFilters(c);

// --- Line 5230 ---
if (!c.dataset.when || !c.dataset.when.includes('T')) {

// --- Line 5231 ---
c.style.display = passesGeneralFilters ? '' : 'none';

// --- Line 5232 ---
}

// --- Line 5233 ---
if (passesGeneralFilters) visibleCount++;

// --- Line 5234 ---
});

// --- Line 5235 ---
updateSlotsHasItems();

// --- Line 5236 ---
updateFiltersUi(allCards.length, $$('.card[style*="display: none"]').length);

// --- Line 5237 ---
updateTotalTimerDisplay();

// --- Line 5238 ---
}

// --- Line 5239 ---


// --- Line 5240 ---
// ... MENUS DE CONTEXTO (move, move-all, etc) MANTIDOS IGUAIS ...

// --- Line 5241 ---
var ctxTarget = null;

// --- Line 5242 ---
var ctx = document.getElementById('ctx');

// --- Line 5243 ---
var ctxMoveSub = document.getElementById('ctx-move-sub');

// --- Line 5244 ---
var ctxMoveAllSub = document.getElementById('ctx-moveall-sub');

// --- Line 5245 ---
var ctxMoveBoardSub = document.getElementById('ctx-move-board-sub');

// --- Line 5246 ---
var listCtxTarget = null; var listCtx = document.getElementById('ctx-list'); var listMoveSub = 
       document.getElementById('ctx-list-move-sub'); var listMoveBoardSub = 
       document.getElementById('ctx-list-move-board-sub');

// --- Line 5247 ---


// --- Line 5248 ---
function hideCtx() {

// --- Line 5249 ---
ctx.style.display = 'none'; ctxTarget = null;

// --- Line 5250 ---
ctxMoveSub.style.display = 'none'; ctxMoveAllSub.style.display = 'none'; 
       ctxMoveBoardSub.style.display = 'none';

// --- Line 5251 ---
$$('.board-nested-sub', ctx).forEach(el => el.style.display = 'none');

// --- Line 5252 ---
}

// --- Line 5253 ---
function showCtx(x, y, card) {

// --- Line 5254 ---
ctxTarget = card;

// --- Line 5255 ---
buildMoveSubmenu(); buildMoveBoardSubmenu();

// --- Line 5256 ---
ctxMoveSub.style.display = 'none'; ctxMoveAllSub.style.display = 'none'; 
       ctxMoveBoardSub.style.display = 'none';

// --- Line 5257 ---
$$('.board-nested-sub', ctx).forEach(el => el.style.display = 'none');

// --- Line 5258 ---
ctx.style.display = 'block';

// --- Line 5259 ---
var r = ctx.getBoundingClientRect();

// --- Line 5260 ---
ctx.style.left = Math.min(x, innerWidth - r.width - 8) + 'px';

// --- Line 5261 ---
ctx.style.top = Math.min(y, innerHeight - r.height - 8) + 'px';

// --- Line 5262 ---
}

// --- Line 5263 ---


// --- Line 5264 ---
// Fechar menus ao clicar fora ou desistir

// --- Line 5265 ---
document.addEventListener('mousedown', function (e) {

// --- Line 5266 ---
// Se clicar fora do menu de contexto do cart�o e n�o for no bot�o de acionamento (kebab)

// --- Line 5267 ---
if (ctx && ctx.style.display === 'block') {

// --- Line 5268 ---
if (!ctx.contains(e.target) && !e.target.closest('.kebab')) {

// --- Line 5269 ---
hideCtx();

// --- Line 5270 ---
}

// --- Line 5271 ---
}

// --- Line 5272 ---
// Se clicar fora do menu de contexto da lista e n�o for no bot�o de acionamento (more)

// --- Line 5273 ---
if (listCtx && listCtx.style.display === 'block') {

// --- Line 5274 ---
if (!listCtx.contains(e.target) && !e.target.closest('.more')) {

// --- Line 5275 ---
listCtx.style.display = 'none';

// --- Line 5276 ---
listCtxTarget = null;

// --- Line 5277 ---
}

// --- Line 5278 ---
}

// --- Line 5279 ---
});

// --- Line 5280 ---


// --- Line 5281 ---


// --- Line 5282 ---
function updateFiltersUi(totalCards, hiddenCardsCount) {

// --- Line 5283 ---
var badge = document.getElementById('filtersOn');

// --- Line 5284 ---
var header = document.getElementById('appHeader');

// --- Line 5285 ---
const anyActive = selectedColors.size > 0 || !!document.getElementById('fFrom').value || 
       !!document.getElementById('fTo').value || !!document.getElementById('fTime').value;

// --- Line 5286 ---
if (anyActive) {

// --- Line 5287 ---
badge.textContent = hiddenCardsCount > 0 ? ('Filtros: ' + hiddenCardsCount + ' oculto' + 
       (hiddenCardsCount > 1 ? 's' : '')) : 'Filtros ativos';

// --- Line 5288 ---
badge.hidden = false;

// --- Line 5289 ---
header.classList.add('filters-active');

// --- Line 5290 ---
} else {

// --- Line 5291 ---
badge.hidden = true;

// --- Line 5292 ---
header.classList.remove('filters-active');

// --- Line 5293 ---
}

// --- Line 5294 ---
}

// --- Line 5295 ---


// --- Line 5296 ---
function buildMoveBoardSubmenu() {

// --- Line 5297 ---
ctxMoveBoardSub.innerHTML = '';

// --- Line 5298 ---
// Remove any previously appended board submenus from #ctx

// --- Line 5299 ---
$$('.board-nested-sub', ctx).forEach(el => el.remove());

// --- Line 5300 ---


// --- Line 5301 ---
boardsMeta.forEach(b => {

// --- Line 5302 ---
if (b.id === currentBoardId) return;

// --- Line 5303 ---


// --- Line 5304 ---
const btn = document.createElement('button');

// --- Line 5305 ---
btn.type = 'button';

// --- Line 5306 ---
btn.style.width = '100%';

// --- Line 5307 ---
btn.style.display = 'flex';

// --- Line 5308 ---
btn.style.alignItems = 'center';

// --- Line 5309 ---
btn.style.justifyContent = 'space-between';

// --- Line 5310 ---
btn.innerHTML = `${b.name} <span style="font-size:10px">?</span>`;

// --- Line 5311 ---


// --- Line 5312 ---
// Create the sub-submenu, but we will append it to #ctx

// --- Line 5313 ---
const nestedSub = document.createElement('div');

// --- Line 5314 ---
nestedSub.className = 'ctx-sub board-nested-sub';

// --- Line 5315 ---
nestedSub.style.display = 'none';

// --- Line 5316 ---
ctx.appendChild(nestedSub);

// --- Line 5317 ---


// --- Line 5318 ---
btn.onclick = function (e) {

// --- Line 5319 ---
e.stopPropagation();

// --- Line 5320 ---
const wasVisible = nestedSub.style.display === 'block';

// --- Line 5321 ---


// --- Line 5322 ---
// Close all nested board submenus

// --- Line 5323 ---
$$('.board-nested-sub', ctx).forEach(d => d.style.display = 'none');

// --- Line 5325 ---
if (!wasVisible) {

// --- Line 5326 ---
if (nestedSub.children.length === 0) {

// --- Line 5327 ---
const bData = getBoardData(b.id);

// --- Line 5328 ---
const kanbanLists = bData.filter(d => d.type === 'kanban');

// --- Line 5329 ---
if (kanbanLists.length === 0) {

// --- Line 5330 ---
const emptyMsg = document.createElement('div'); 

// --- Line 5331 ---
emptyMsg.textContent = '(Vazio)'; 

// --- Line 5332 ---
emptyMsg.style.padding = '8px'; 

// --- Line 5333 ---
emptyMsg.style.color = '#777'; 

// --- Line 5334 ---
nestedSub.appendChild(emptyMsg);

// --- Line 5335 ---
} else {

// --- Line 5336 ---
kanbanLists.forEach(l => {

// --- Line 5337 ---
const lBtn = document.createElement('button'); 

// --- Line 5338 ---
lBtn.type = 'button';

// --- Line 5339 ---
lBtn.textContent = l.title || 'Sem t�tulo';

// --- Line 5340 ---
lBtn.onclick = function (ev) { 

// --- Line 5341 ---
ev.stopPropagation(); 

// --- Line 5342 ---
moveCardToBoard(ctxTarget, b.id, l.title); 

// --- Line 5343 ---
hideCtx(); 

// --- Line 5344 ---
};

// --- Line 5345 ---
nestedSub.appendChild(lBtn);

// --- Line 5346 ---
});

// --- Line 5347 ---
}

// --- Line 5348 ---
}

// --- Line 5349 ---


// --- Line 5350 ---
// Position the nested submenu relative to the button

// --- Line 5351 ---
const btnRect = btn.getBoundingClientRect();

// --- Line 5352 ---
const ctxRect = ctx.getBoundingClientRect();

// --- Line 5353 ---


// --- Line 5354 ---
nestedSub.style.display = 'block';

// --- Line 5355 ---


// --- Line 5356 ---
// Calculate positioning

// --- Line 5357 ---
let leftPos = btnRect.right - ctxRect.left;

// --- Line 5358 ---
let topPos = btnRect.top - ctxRect.top;

// --- Line 5359 ---


// --- Line 5360 ---
nestedSub.style.left = leftPos + 'px';

// --- Line 5361 ---
nestedSub.style.top = topPos + 'px';

// --- Line 5362 ---


// --- Line 5363 ---
// Smart flip left if offscreen

// --- Line 5364 ---
const subRect = nestedSub.getBoundingClientRect();

// --- Line 5365 ---
if (subRect.right > window.innerWidth) {

// --- Line 5366 ---
// flip left

// --- Line 5367 ---
nestedSub.style.left = (btnRect.left - ctxRect.left - subRect.width) + 'px';

// --- Line 5368 ---
}

// --- Line 5369 ---
// Smart vertical adjustment if offscreen

// --- Line 5370 ---
if (subRect.bottom > window.innerHeight) {

// --- Line 5371 ---
nestedSub.style.top = (btnRect.bottom - ctxRect.top - subRect.height) + 'px';

// --- Line 5372 ---
}

// --- Line 5373 ---
}

// --- Line 5374 ---
};

// --- Line 5375 ---
ctxMoveBoardSub.appendChild(btn);

// --- Line 5376 ---
});

// --- Line 5377 ---
if (ctxMoveBoardSub.children.length === 0) {

// --- Line 5378 ---
const msg = document.createElement('div'); msg.textContent = 'Nenhum outro quadro.'; 
       msg.style.padding = '10px'; msg.style.color = '#777'; ctxMoveBoardSub.appendChild(msg);

// --- Line 5379 ---
}

// --- Line 5380 ---
}

// --- Line 5381 ---


// --- Line 5382 ---
function addMoveButton(targetListElement, name, submenuContainer) {

// --- Line 5383 ---
var b = el('button'); b.textContent = name;

// --- Line 5384 ---
b.addEventListener('click', function (ev) {

// --- Line 5385 ---
ev.stopPropagation();

// --- Line 5386 ---
var block = getSelectionOr(ctxTarget);

// --- Line 5387 ---
if (!block.length) return;

// --- Line 5388 ---
var destContainer = targetListElement.querySelector('.cards') || targetListElement;

// --- Line 5389 ---
var isAgendaDrop = targetListElement.closest('#agenda-sidebar');

// --- Line 5390 ---
applyWhen(targetListElement, block);

// --- Line 5391 ---


// --- Line 5392 ---
let targetListTitle = 'Agenda/Outro';

// --- Line 5393 ---
const listEl = targetListElement.closest('.list');

// --- Line 5394 ---
if (listEl) {

// --- Line 5395 ---
const titleInp = listEl.querySelector('.title');

// --- Line 5396 ---
targetListTitle = titleInp ? titleInp.value : (listEl.dataset.quad || listEl.id || 
       listEl.dataset.time || 'Agenda');

// --- Line 5397 ---
}

// --- Line 5398 ---
block.forEach(function (n) { addCardHistory(n, 'Movido para a lista "' + targetListTitle + 
       '" via Menu'); });

// --- Line 5399 ---


// --- Line 5400 ---
if (!isAgendaDrop) { block.forEach(function (cardElement) { 
       destContainer.appendChild(cardElement); }); }

// --- Line 5401 ---
updateSlotsHasItems(); persist(); applyFilters(); hideCtx();

// --- Line 5402 ---
});

// --- Line 5403 ---
submenuContainer.appendChild(b);

// --- Line 5404 ---
}

// --- Line 5405 ---


// --- Line 5406 ---
function buildMoveAllSubmenu(fromList) {

// --- Line 5407 ---
ctxMoveAllSub.innerHTML = '';

// --- Line 5408 ---
$$('.list').forEach(function (l, i) {

// --- Line 5409 ---
if (l === fromList) return;

// --- Line 5410 ---
addMoveAllButton(l, (l.querySelector('.title') ? l.querySelector('.title').value : null) || 
       l.dataset.quad || l.dataset.time || ('Lista ' + (i + 1)), ctxMoveAllSub, fromList);

// --- Line 5411 ---
});

// --- Line 5412 ---
const goalSlot = slotsRoot.querySelector('.goal-slot');

// --- Line 5413 ---
if (goalSlot && goalSlot !== fromList) addMoveAllButton(goalSlot, '?? OBJETIVO DO DIA', 
       ctxMoveAllSub, fromList);

// --- Line 5414 ---
}

// --- Line 5415 ---


// --- Line 5416 ---
function addMoveAllButton(targetListElement, name, submenuContainer, sourceListElement) {

// --- Line 5417 ---
var b = el('button'); b.textContent = name;

// --- Line 5418 ---
b.addEventListener('click', function (ev) {

// --- Line 5419 ---
ev.stopPropagation();

// --- Line 5420 ---
const sourceCardsContainer = sourceListElement.querySelector('.cards');

// --- Line 5421 ---
if (!sourceCardsContainer) return;

// --- Line 5422 ---
const cardsToMove = Array.from(sourceCardsContainer.querySelectorAll('.card'));

// --- Line 5423 ---
if (!cardsToMove.length) return;

// --- Line 5424 ---
var destContainer = targetListElement.querySelector('.cards') || targetListElement;

// --- Line 5425 ---
var isAgendaDrop = targetListElement.closest('#agenda-sidebar');

// --- Line 5426 ---
applyWhen(targetListElement, cardsToMove);

// --- Line 5427 ---


// --- Line 5428 ---
let targetListTitle = 'Agenda/Outro';

// --- Line 5429 ---
const listEl = targetListElement.closest('.list');

// --- Line 5430 ---
if (listEl) {

// --- Line 5431 ---
const titleInp = listEl.querySelector('.title');

// --- Line 5432 ---
targetListTitle = titleInp ? titleInp.value : (listEl.dataset.quad || listEl.id || 
       listEl.dataset.time || 'Agenda');

// --- Line 5433 ---
}

// --- Line 5434 ---
cardsToMove.forEach(function (n) { addCardHistory(n, 'Movido para a lista "' + 
       targetListTitle + '" via Menu'); });

// --- Line 5435 ---


// --- Line 5436 ---
if (!isAgendaDrop) { cardsToMove.forEach(function (cardElement) { 
       destContainer.appendChild(cardElement); }); }

// --- Line 5437 ---
else { cardsToMove.forEach(c => c.remove()); }

// --- Line 5438 ---
updateSlotsHasItems(); persist(); applyFilters(); hideCtx();

// --- Line 5439 ---
});

// --- Line 5440 ---
submenuContainer.appendChild(b);

// --- Line 5441 ---
}

// --- Line 5442 ---


// --- Line 5443 ---
function smartPositionSubmenu(btnElement, submenuElement) {

// --- Line 5444 ---
const ctxMenu = submenuElement.closest('.ctx');

// --- Line 5445 ---
if (ctxMenu) {

// --- Line 5446 ---
ctxMenu.querySelectorAll('div[style*="position:relative"]').forEach(div => {

// --- Line 5447 ---
div.style.zIndex = '';

// --- Line 5448 ---
});

// --- Line 5449 ---
}

// --- Line 5450 ---
const parentDiv = submenuElement.parentElement;

// --- Line 5451 ---
if (parentDiv && parentDiv.style.position === 'relative') {

// --- Line 5452 ---
parentDiv.style.zIndex = '100';

// --- Line 5453 ---
}

// --- Line 5454 ---


// --- Line 5455 ---
submenuElement.classList.remove('flip-left');

// --- Line 5456 ---
submenuElement.style.display = 'block';

// --- Line 5457 ---
submenuElement.style.top = '0';

// --- Line 5458 ---
const rect = submenuElement.getBoundingClientRect();

// --- Line 5459 ---
if (rect.right > window.innerWidth) submenuElement.classList.add('flip-left');

// --- Line 5460 ---
if (rect.bottom > window.innerHeight) submenuElement.style.top = `-${rect.bottom - 
       window.innerHeight + 10}px`;

// --- Line 5461 ---
}

// --- Line 5462 ---


// --- Line 5463 ---
ctx.addEventListener('click', function (e) {

// --- Line 5464 ---
var btn = e.target.closest('button');

// --- Line 5465 ---
if (!btn) return;

// --- Line 5466 ---
var action = btn.dataset.action;

// --- Line 5467 ---
var block = getSelectionOr(ctxTarget);

// --- Line 5468 ---
if (action === 'move') {

// --- Line 5469 ---
const isClosed = ctxMoveSub.style.display === 'none';

// --- Line 5470 ---
ctxMoveAllSub.style.display = 'none'; ctxMoveBoardSub.style.display = 'none';

// --- Line 5471 ---
if (isClosed) smartPositionSubmenu(btn, ctxMoveSub); else ctxMoveSub.style.display = 'none';

// --- Line 5472 ---
return;

// --- Line 5473 ---
}

// --- Line 5474 ---
if (action === 'move-all') {

// --- Line 5475 ---
var list = (ctxTarget || block[0]) ? (ctxTarget || block[0]).closest('.list') : null;

// --- Line 5476 ---
if (!list) return;

// --- Line 5477 ---
buildMoveAllSubmenu(list);

// --- Line 5478 ---
const isClosed = ctxMoveAllSub.style.display === 'none';

// --- Line 5479 ---
ctxMoveSub.style.display = 'none'; ctxMoveBoardSub.style.display = 'none';

// --- Line 5480 ---
if (isClosed) smartPositionSubmenu(btn, ctxMoveAllSub); else ctxMoveAllSub.style.display = 
       'none';

// --- Line 5481 ---
return;

// --- Line 5482 ---
}

// --- Line 5483 ---
if (action === 'move-board') {

// --- Line 5484 ---
const isClosed = ctxMoveBoardSub.style.display === 'none';

// --- Line 5485 ---
ctxMoveSub.style.display = 'none'; ctxMoveAllSub.style.display = 'none';

// --- Line 5486 ---
if (isClosed) smartPositionSubmenu(btn, ctxMoveBoardSub); else 
       ctxMoveBoardSub.style.display = 'none';

// --- Line 5487 ---
return;

// --- Line 5488 ---
}

// --- Line 5489 ---
hideCtx();

// --- Line 5490 ---
if (action === 'edit') { if (block.length) startInlineEdit(block[0]); }

// --- Line 5491 ---
else if (action === 'prop') { showPropertiesDialog(block[0]); }

// --- Line 5492 ---
else if (action === 'dup') { duplicateCards(block); }

// --- Line 5493 ---
else if (action === 'del') { block.forEach(function (n) { removeCard(n); }); }

// --- Line 5494 ---
else if (action === 'color') { openColorDialog(block); }

// --- Line 5495 ---
else if (action === 'date') { openDateDialog(block); }

// --- Line 5496 ---
else if (action === 'agenda') { if (block.length) openAgendaDialog(block[0]); }

// --- Line 5497 ---
else if (action === 'alert') { if (block.length) openAlertDialog(block[0], function(res) { 
       block[0].dataset.alertEnabled = res.alertEnabled ? 'true' : 'false'; block[0].dataset.alertValue = 
       res.alertValue; block[0].dataset.alertUnit = res.alertUnit; block[0].dataset.alertFired = 'false'; 
       paintCard(block[0]); persist(); }); }

// --- Line 5498 ---
else if (action === 'timer') { openTimerDialog(block); }

// --- Line 5499 ---
else if (action === 'gemini-subtasks') { generateSubtasks(block); }

// --- Line 5500 ---
else if (action === 'gemini-organize') { organizeCardWithGemini(block); }

// --- Line 5501 ---
else if (action === 'select-mode') { if (!isSelectionMode) toggleSelectionMode(); 
       addSelection(block[0]); }

// --- Line 5502 ---
else if (action === 'del-all') { var list2 = (ctxTarget || block[0]) ? (ctxTarget || 
       block[0]).closest('.list') : null; if (!list2) return; showConfirm('Excluir TODOS os cart�es desta lista?', 
       function () { $$('.card', list2).forEach(function (c) { removeCard(c); }); }); }

// --- Line 5503 ---
});

// --- Line 5504 ---


// --- Line 5505 ---
function showPropertiesDialog(card) {

// --- Line 5506 ---
if (!card) return;

// --- Line 5507 ---
showModal('Propriedades do Cart�o', function() {

// --- Line 5508 ---
const wrap = el('div');

// --- Line 5509 ---
wrap.style.textAlign = 'left';

// --- Line 5510 ---
wrap.style.fontSize = '14px';

// --- Line 5511 ---
wrap.style.lineHeight = '1.5';

// --- Line 5512 ---


// --- Line 5513 ---
let hist = [];

// --- Line 5514 ---
try { hist = JSON.parse(card.dataset.history || '[]'); } catch(e) {}

// --- Line 5515 ---


// --- Line 5516 ---
if (hist.length === 0) {

// --- Line 5517 ---
const fallBackStr = el('div');

// --- Line 5518 ---
fallBackStr.style.color = '#ccc';

// --- Line 5519 ---
fallBackStr.textContent = 'Sem registros de hist�rico. (Cart�o legado)';

// --- Line 5520 ---
wrap.appendChild(fallBackStr);

// --- Line 5521 ---
} else {

// --- Line 5522 ---
const ul = el('ul');

// --- Line 5523 ---
ul.style.paddingLeft = '20px';

// --- Line 5524 ---
ul.style.color = '#cfe0ff';

// --- Line 5525 ---
ul.style.margin = '0';

// --- Line 5526 ---


// --- Line 5527 ---
hist.forEach(h => {

// --- Line 5528 ---
const li = el('li');

// --- Line 5529 ---
const dateStr = new Date(h.time).toLocaleString();

// --- Line 5530 ---
li.innerHTML = `<strong>${h.action}</strong> <br><span 
       style="font-size:12px;color:#9fb3d2">?? ${dateStr}</span>`;

// --- Line 5531 ---
li.style.marginBottom = '8px';

// --- Line 5532 ---
ul.appendChild(li);

// --- Line 5533 ---
});

// --- Line 5534 ---
wrap.appendChild(ul);

// --- Line 5535 ---
}

// --- Line 5536 ---


// --- Line 5537 ---
return wrap;

// --- Line 5538 ---
}, function() {});

// --- Line 5539 ---
}

// --- Line 5540 ---


// --- Line 5541 ---
function showListCtx(x, y, list) {

// --- Line 5542 ---
listCtxTarget = list;

// --- Line 5543 ---
buildListMoveSub();

// --- Line 5544 ---
listMoveSub.style.display = 'none';

// --- Line 5545 ---
if (listMoveBoardSub) listMoveBoardSub.style.display = 'none';

// --- Line 5546 ---
listCtx.style.display = 'block';

// --- Line 5547 ---
var r = listCtx.getBoundingClientRect();

// --- Line 5548 ---
listCtx.style.left = Math.min(x, innerWidth - r.width - 8) + 'px';

// --- Line 5549 ---
listCtx.style.top = Math.min(y, innerHeight - r.height - 8) + 'px';

// --- Line 5550 ---
}

// --- Line 5551 ---
function buildListMoveSub() {

// --- Line 5552 ---
listMoveSub.innerHTML = '';

// --- Line 5553 ---
if (!listCtxTarget) return;

// --- Line 5554 ---
$$('.list').forEach(function (l, i) {

// --- Line 5555 ---
if (l === listCtxTarget) return;

// --- Line 5556 ---
addMoveAllButton(l, (l.querySelector('.title') ? l.querySelector('.title').value : null) || 
       l.dataset.quad || l.dataset.time || ('Lista ' + (i + 1)), listMoveSub, listCtxTarget);

// --- Line 5557 ---
});

// --- Line 5558 ---
const goalSlot = slotsRoot.querySelector('.goal-slot');

// --- Line 5559 ---
if (goalSlot && goalSlot !== listCtxTarget) addMoveAllButton(goalSlot, '?? OBJETIVO DO DIA', 
       listMoveSub, listCtxTarget);

// --- Line 5560 ---
}

// --- Line 5561 ---
function buildListMoveBoardSub() {

// --- Line 5562 ---
if (!listMoveBoardSub || !listCtxTarget) return;

// --- Line 5563 ---
listMoveBoardSub.innerHTML = '';

// --- Line 5564 ---
boardsMeta.forEach(b => {

// --- Line 5565 ---
if (b.id === currentBoardId || b.id === 'board-todos' || b.id === 'board-trash') return;

// --- Line 5566 ---
const btn = el('button');

// --- Line 5567 ---
btn.textContent = b.name;

// --- Line 5568 ---
btn.addEventListener('click', function(ev) {

// --- Line 5569 ---
ev.stopPropagation();

// --- Line 5570 ---
moveListToBoard(listCtxTarget, b.id);

// --- Line 5571 ---
listCtx.style.display = 'none';

// --- Line 5572 ---
});

// --- Line 5573 ---
listMoveBoardSub.appendChild(btn);

// --- Line 5574 ---
});

// --- Line 5575 ---
}

// --- Line 5576 ---
function moveListToBoard(listElement, targetBoardId) {

// --- Line 5577 ---
if (!listElement || !targetBoardId) return;

// --- Line 5578 ---
const targetColor = getBoardColor(targetBoardId);

// --- Line 5579 ---
const currentIsTodos = (currentBoardId === 'board-todos');

// --- Line 5580 ---
const listTitle = (listElement.querySelector('.title') ? 
       listElement.querySelector('.title').value : 'Lista');

// --- Line 5581 ---
const cards = Array.from(listElement.querySelectorAll('.card'));

// --- Line 5582 ---
const targetBoardMeta = boardsMeta.find(b => b.id === targetBoardId);

// --- Line 5583 ---
const targetBoardName = targetBoardMeta ? targetBoardMeta.name : 'Outro Quadro';

// --- Line 5584 ---


// --- Line 5585 ---
const cardsData = cards.map(c => {

// --- Line 5586 ---
const cData = cardToData(c);

// --- Line 5587 ---
cData.boardId = targetBoardId;

// --- Line 5588 ---
if (targetColor) cData.color = targetColor;

// --- Line 5589 ---
return cData;

// --- Line 5590 ---
});

// --- Line 5591 ---


// --- Line 5592 ---
if (!currentIsTodos) {

// --- Line 5593 ---
const targetBoardData = getBoardData(targetBoardId);

// --- Line 5594 ---
targetBoardData.push({

// --- Line 5595 ---
type: 'kanban',

// --- Line 5596 ---
title: listTitle,

// --- Line 5597 ---
boardId: targetBoardId,

// --- Line 5598 ---
cards: cardsData

// --- Line 5599 ---
});

// --- Line 5600 ---
localStorage.setItem(LS_BOARD_PREFIX + targetBoardId, JSON.stringify(targetBoardData));

// --- Line 5601 ---
if (isFirebaseReady && auth && auth.currentUser) {

// --- Line 5602 ---
db.ref('users/' + auth.currentUser.uid + '/boards/' + 
       targetBoardId).set(targetBoardData)

// --- Line 5603 ---
.catch(e => console.error("Firebase board save error:", e));

// --- Line 5604 ---
}

// --- Line 5605 ---
listElement.remove();

// --- Line 5606 ---
} else {

// --- Line 5607 ---
listElement.dataset.boardId = targetBoardId;

// --- Line 5608 ---
cards.forEach(c => {

// --- Line 5609 ---
c.dataset.boardId = targetBoardId;

// --- Line 5610 ---
if (targetColor) c.dataset.color = targetColor;

// --- Line 5611 ---
addCardHistory(c, 'Lista movida para o quadro "' + targetBoardName + '"');

// --- Line 5612 ---
paintCard(c);

// --- Line 5613 ---
});

// --- Line 5614 ---
}

// --- Line 5615 ---
persist();

// --- Line 5616 ---
updateSlotsHasItems();

// --- Line 5617 ---
showToast(`Lista "${listTitle}" movida para o quadro "${targetBoardName}"`);

// --- Line 5618 ---
}

// --- Line 5619 ---
function buildMoveSubmenu() {

// --- Line 5620 ---
ctxMoveSub.innerHTML = '';

// --- Line 5621 ---
$$('.list[data-type="kanban"]', boardEl).forEach(function (l, i) { addMoveButton(l, 
       (l.querySelector('.title') ? l.querySelector('.title').value : null) || ('Lista ' + (i + 1)), ctxMoveSub); });

// --- Line 5622 ---
const matrixLabels = { 'Q1': 'Q1 - FA�A AGORA', 'Q2': 'Q2 - AGENDE', 'Q3': 'Q3 - DELEGUE', 
       'Q4': 'Q4 - ELIMINE' };

// --- Line 5623 ---
$$('.list[data-type="quad"]', matrixEl).forEach(function (l) { addMoveButton(l, 
       matrixLabels[l.dataset.quad] || l.dataset.quad, ctxMoveSub); });

// --- Line 5624 ---
const goalSlot = slotsRoot.querySelector('.goal-slot');

// --- Line 5625 ---
if (goalSlot) addMoveButton(goalSlot, '?? OBJETIVO DO DIA', ctxMoveSub);

// --- Line 5626 ---
$$('.list[data-type="time"]', schedule).forEach(function (l) { addMoveButton(l, l.dataset.time, 
       ctxMoveSub); });

// --- Line 5627 ---
}

// --- Line 5628 ---
listCtx.addEventListener('click', function (e) {

// --- Line 5629 ---
var b = e.target.closest('button');

// --- Line 5630 ---
if (!b) return;

// --- Line 5631 ---
var action = b.dataset.action;

// --- Line 5632 ---
if (action === 'list-move-all') {

// --- Line 5633 ---
listMoveSub.style.display = (listMoveSub.style.display === 'block' ? 'none' : 'block');

// --- Line 5634 ---
if (listMoveBoardSub) listMoveBoardSub.style.display = 'none';

// --- Line 5635 ---
return;

// --- Line 5636 ---
}

// --- Line 5637 ---
if (action === 'list-move-board') {

// --- Line 5638 ---
buildListMoveBoardSub();

// --- Line 5639 ---
if (listMoveBoardSub) {

// --- Line 5640 ---
listMoveBoardSub.style.display = (listMoveBoardSub.style.display === 'block' ? 'none' : 
       'block');

// --- Line 5641 ---
}

// --- Line 5642 ---
listMoveSub.style.display = 'none';

// --- Line 5643 ---
return;

// --- Line 5644 ---
}

// --- Line 5645 ---
if (action === 'list-del' && listCtxTarget) {

// --- Line 5646 ---
showConfirm('Excluir a lista inteira?', function () {

// --- Line 5647 ---
listCtxTarget.remove();

// --- Line 5648 ---
persist();

// --- Line 5649 ---
});

// --- Line 5650 ---
}

// --- Line 5651 ---
if (action === 'list-del-all' && listCtxTarget) {

// --- Line 5652 ---
showConfirm('Excluir TODOS os cart�es desta lista?', function () {

// --- Line 5653 ---
$$('.card', listCtxTarget).forEach(function (c) { removeCard(c); });

// --- Line 5654 ---
persist();

// --- Line 5655 ---
updateSlotsHasItems();

// --- Line 5656 ---
});

// --- Line 5657 ---
}

// --- Line 5658 ---
listCtx.style.display = 'none';

// --- Line 5659 ---
});

// --- Line 5660 ---


// --- Line 5661 ---
// ===== Modal helpers + Paleta =====

// --- Line 5662 ---
var MATRIX_COLORS = { Q1: '#104239', Q2: '#0e3155', Q3: '#5a4014', Q4: '#5a1419' };

// --- Line 5663 ---
var customColorLabels = JSON.parse(localStorage.getItem(LS_LABELS_KEY)) || {

// --- Line 5664 ---
'#5dade2': 'Azul claro (Krav Maga)', '#f9e79f': 'Amarelo claro (GDF)', '#f5b041': 'Laranja 
       (Pessoal)',

// --- Line 5665 ---
'#1abc9c': 'Verde-�gua', '#8e44ad': 'Lil�s', '#1f3a93': 'Azul escuro', '#2c3e50': 'Grafite', 
       '#48c9b0': 'Turquesa'

// --- Line 5666 ---
};

// --- Line 5667 ---
function saveCustomLabels() { localStorage.setItem(LS_LABELS_KEY, 
       JSON.stringify(customColorLabels)); }

// --- Line 5668 ---
var EXTRA_COLORS = [];

// --- Line 5669 ---
function buildFullPalette() {

// --- Line 5670 ---
EXTRA_COLORS = [

// --- Line 5671 ---
{ id: 'krav', name: customColorLabels['#5dade2'] || 'Azul claro (Krav Maga)', hex: 
       '#5dade2' },

// --- Line 5672 ---
{ id: 'gdf', name: customColorLabels['#f9e79f'] || 'Amarelo claro (GDF)', hex: '#f9e79f' },

// --- Line 5673 ---
{ id: 'pessoal', name: customColorLabels['#f5b041'] || 'Laranja (Pessoal)', hex: '#f5b041' 
       },

// --- Line 5674 ---
{ id: 'teal', name: customColorLabels['#1abc9c'] || 'Verde-�gua', hex: '#1abc9c' },

// --- Line 5675 ---
{ id: 'lilas', name: customColorLabels['#8e44ad'] || 'Lil�s', hex: '#8e44ad' },

// --- Line 5676 ---
{ id: 'navy', name: customColorLabels['#1f3a93'] || 'Azul escuro', hex: '#1f3a93' },

// --- Line 5677 ---
{ id: 'grafite', name: customColorLabels['#2c3e50'] || 'Grafite', hex: '#2c3e50' },

// --- Line 5678 ---
{ id: 'turquesa', name: customColorLabels['#48c9b0'] || 'Turquesa', hex: '#48c9b0' }

// --- Line 5679 ---
];

// --- Line 5680 ---
return [

// --- Line 5681 ---
{ id: 'q1', name: 'Verde (Fa�a agora)', hex: '#2e7d32', noEdit: true },

// --- Line 5682 ---
{ id: 'q2', name: 'Azul (Agende)', hex: '#1976d2', noEdit: true },

// --- Line 5683 ---
{ id: 'q3', name: '�mbar (Delegue)', hex: '#ffb300', noEdit: true },

// --- Line 5684 ---
{ id: 'q4', name: 'Vermelho (Elimine)', hex: '#c62828', noEdit: true }

// --- Line 5685 ---
].concat(EXTRA_COLORS);

// --- Line 5686 ---
}

// --- Line 5687 ---
function routeByColor(card, hex) { if (!hex || !matrixEl) return; var map = {}; 
       map[MATRIX_COLORS.Q1] = 'Q1'; map[MATRIX_COLORS.Q2] = 'Q2'; map[MATRIX_COLORS.Q3] = 'Q3'; map[MATRIX_COLORS.Q4] 
       = 'Q4'; var quad = map[(hex || '').toLowerCase()]; if (!quad) return; var dest = 
       matrixEl.querySelector('.list[data-quad="' + quad + '"] .cards'); if (dest) { dest.appendChild(card); 
       card.dataset.when = ''; updateSlotsHasItems(); } }

// --- Line 5688 ---


// --- Line 5689 ---
function showModal(title, builder, onOk) {

// --- Line 5690 ---
var wrap = el('div', 'modal-wrap'); var box = el('div', 'modal');

// --- Line 5691 ---
var h = el('h3'); h.textContent = title; box.appendChild(h);

// --- Line 5692 ---
var body = builder(); box.appendChild(body);

// --- Line 5693 ---
var row = el('div', 'row');

// --- Line 5694 ---
var cancel = el('button', 'cancel'); cancel.textContent = 'Cancelar';

// --- Line 5695 ---
var ok = el('button', 'ok'); ok.textContent = 'OK';

// --- Line 5696 ---
row.appendChild(cancel); row.appendChild(ok); box.appendChild(row);

// --- Line 5697 ---
wrap.appendChild(box); document.body.appendChild(wrap);

// --- Line 5698 ---
const modalKeyListener = function (e) {

// --- Line 5699 ---
if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON' && 
       !document.activeElement.closest('.import-options')) { e.preventDefault(); ok.click(); }

// --- Line 5700 ---
else if (e.key === 'Escape') { e.preventDefault(); cancel.click(); }

// --- Line 5701 ---
};

// --- Line 5702 ---
wrap.setAttribute('tabindex', '-1'); wrap.focus(); wrap.addEventListener('keydown', 
       modalKeyListener);

// --- Line 5703 ---
cancel.onclick = function () { wrap.removeEventListener('keydown', modalKeyListener); 
       document.body.removeChild(wrap); };

// --- Line 5704 ---
ok.onclick = function () { wrap.removeEventListener('keydown', modalKeyListener); onOk(body, 
       wrap); if (wrap.parentNode === document.body) document.body.removeChild(wrap); persist(); };

// --- Line 5705 ---
var firstInput = body.querySelector('input'); if (firstInput) firstInput.focus();

// --- Line 5706 ---
return { wrap: wrap, okButton: ok, cancelButton: cancel, body: body };

// --- Line 5707 ---
}

// --- Line 5708 ---


// --- Line 5709 ---
function showConfirm(message, onYes) { showModal('Confirma��o', function () { var d = el('div'); 
       d.textContent = message; return d; }, function (body, wrap) { if (typeof onYes === 'function') onYes(); }); }

// --- Line 5710 ---


// --- Line 5711 ---
function openColorDialog(cards) {

// --- Line 5712 ---
if (!cards.length) return;

// --- Line 5713 ---
var modalElements = showModal('Cor da Etiqueta', function () {

// --- Line 5714 ---
var wrap = el('div');

// --- Line 5715 ---
wrap.style.display = 'flex';

// --- Line 5716 ---
wrap.style.flexDirection = 'column';

// --- Line 5717 ---
wrap.style.gap = '12px';

// --- Line 5718 ---
wrap.style.minWidth = '320px';

// --- Line 5719 ---


// --- Line 5720 ---
// 1. Grid de Etiquetas Predefinidas (Eisenhower)

// --- Line 5721 ---
var sectionPre = el('div');

// --- Line 5722 ---
var headerPre = el('strong');

// --- Line 5723 ---
headerPre.style.fontSize = '12px';

// --- Line 5724 ---
headerPre.style.color = '#9fb3d2';

// --- Line 5725 ---
headerPre.style.display = 'block';

// --- Line 5726 ---
headerPre.style.marginBottom = '6px';

// --- Line 5727 ---
headerPre.textContent = 'Matriz de Eisenhower';

// --- Line 5728 ---
sectionPre.appendChild(headerPre);

// --- Line 5729 ---


// --- Line 5730 ---
var gridPre = el('div');

// --- Line 5731 ---
gridPre.style.display = 'grid';

// --- Line 5732 ---
gridPre.style.gridTemplateColumns = 'repeat(2, 1fr)';

// --- Line 5733 ---
gridPre.style.gap = '8px';

// --- Line 5734 ---


// --- Line 5735 ---
const eisenhowerList = [

// --- Line 5736 ---
{ name: 'Fa�a (Verde)', hex: '#2e7d32' },

// --- Line 5737 ---
{ name: 'Agende (Azul)', hex: '#1976d2' },

// --- Line 5738 ---
{ name: 'Delegue (Amarelo)', hex: '#ffb300' },

// --- Line 5739 ---
{ name: 'Elimine (Vermelho)', hex: '#c62828' }

// --- Line 5740 ---
];

// --- Line 5741 ---


// --- Line 5742 ---
eisenhowerList.forEach(p => {

// --- Line 5743 ---
var b = el('button');

// --- Line 5744 ---
b.type = 'button';

// --- Line 5745 ---
b.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 5746 ---
b.style.borderRadius = '8px';

// --- Line 5747 ---
b.style.padding = '10px';

// --- Line 5748 ---
b.style.cursor = 'pointer';

// --- Line 5749 ---
b.style.background = p.hex;

// --- Line 5750 ---
b.style.color = '#fff';

// --- Line 5751 ---
b.style.fontWeight = 'bold';

// --- Line 5752 ---
b.textContent = p.name;

// --- Line 5753 ---
b.onclick = function () {

// --- Line 5754 ---
wrap._chosen = p.hex;

// --- Line 5755 ---
modalElements.okButton.click();

// --- Line 5756 ---
};

// --- Line 5757 ---
if (cards[0].dataset.labelColor === p.hex) {

// --- Line 5758 ---
b.style.outline = '2px solid #fff';

// --- Line 5759 ---
}

// --- Line 5760 ---
gridPre.appendChild(b);

// --- Line 5761 ---
});

// --- Line 5762 ---
sectionPre.appendChild(gridPre);

// --- Line 5763 ---
wrap.appendChild(sectionPre);

// --- Line 5764 ---


// --- Line 5765 ---
// 2. Outras Etiquetas

// --- Line 5766 ---
var sectionCustom = el('div');

// --- Line 5767 ---
var headerCustom = el('strong');

// --- Line 5768 ---
headerCustom.style.fontSize = '12px';

// --- Line 5769 ---
headerCustom.style.color = '#9fb3d2';

// --- Line 5770 ---
headerCustom.style.display = 'block';

// --- Line 5771 ---
headerCustom.style.marginBottom = '6px';

// --- Line 5772 ---
headerCustom.textContent = 'Outras Etiquetas';

// --- Line 5773 ---
sectionCustom.appendChild(headerCustom);

// --- Line 5774 ---


// --- Line 5775 ---
var gridCustom = el('div');

// --- Line 5776 ---
gridCustom.className = 'custom-labels-grid';

// --- Line 5777 ---
gridCustom.style.display = 'grid';

// --- Line 5778 ---
gridCustom.style.gridTemplateColumns = 'repeat(2, 1fr)';

// --- Line 5779 ---
gridCustom.style.gap = '8px';

// --- Line 5780 ---


// --- Line 5781 ---
function renderCustomLabels() {

// --- Line 5782 ---
gridCustom.innerHTML = '';

// --- Line 5783 ---
// Sem etiqueta option

// --- Line 5784 ---
var bNone = el('button');

// --- Line 5785 ---
bNone.type = 'button';

// --- Line 5786 ---
bNone.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 5787 ---
bNone.style.borderRadius = '8px';

// --- Line 5788 ---
bNone.style.padding = '10px';

// --- Line 5789 ---
bNone.style.cursor = 'pointer';

// --- Line 5790 ---
bNone.style.background = 'var(--bg)';

// --- Line 5791 ---
bNone.style.color = '#fff';

// --- Line 5792 ---
bNone.textContent = 'Sem Etiqueta';

// --- Line 5793 ---
bNone.onclick = function () {

// --- Line 5794 ---
wrap._chosen = '';

// --- Line 5795 ---
modalElements.okButton.click();

// --- Line 5796 ---
};

// --- Line 5797 ---
if (!cards[0].dataset.labelColor) {

// --- Line 5798 ---
bNone.style.outline = '2px solid #fff';

// --- Line 5799 ---
}

// --- Line 5800 ---
gridCustom.appendChild(bNone);

// --- Line 5801 ---


// --- Line 5802 ---
Object.keys(customColorLabels).forEach(hex => {

// --- Line 5803 ---
var b = el('button');

// --- Line 5804 ---
b.type = 'button';

// --- Line 5805 ---
b.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 5806 ---
b.style.borderRadius = '8px';

// --- Line 5807 ---
b.style.padding = '10px';

// --- Line 5808 ---
b.style.cursor = 'pointer';

// --- Line 5809 ---
b.style.background = hex;

// --- Line 5810 ---
b.style.color = '#fff';

// --- Line 5811 ---
b.style.fontWeight = 'bold';

// --- Line 5812 ---
b.textContent = customColorLabels[hex] || hex;

// --- Line 5813 ---
b.onclick = function () {

// --- Line 5814 ---
wrap._chosen = hex;

// --- Line 5815 ---
modalElements.okButton.click();

// --- Line 5816 ---
};

// --- Line 5817 ---
if (cards[0].dataset.labelColor === hex) {

// --- Line 5818 ---
b.style.outline = '2px solid #fff';

// --- Line 5819 ---
}

// --- Line 5820 ---
gridCustom.appendChild(b);

// --- Line 5821 ---
});

// --- Line 5822 ---
}

// --- Line 5823 ---
renderCustomLabels();

// --- Line 5824 ---
sectionCustom.appendChild(gridCustom);

// --- Line 5825 ---
wrap.appendChild(sectionCustom);

// --- Line 5826 ---


// --- Line 5827 ---
// 3. Adicionar/Gerir Nova Etiqueta (com Seletor de Cores RGB)

// --- Line 5828 ---
var addArea = el('div');

// --- Line 5829 ---
addArea.style.borderTop = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 5830 ---
addArea.style.paddingTop = '10px';

// --- Line 5831 ---
addArea.style.display = 'flex';

// --- Line 5832 ---
addArea.style.flexDirection = 'column';

// --- Line 5833 ---
addArea.style.gap = '8px';

// --- Line 5834 ---


// --- Line 5835 ---
var headerNew = el('strong');

// --- Line 5836 ---
headerNew.style.fontSize = '12px';

// --- Line 5837 ---
headerNew.style.color = '#9fb3d2';

// --- Line 5838 ---
headerNew.style.display = 'block';

// --- Line 5839 ---
headerNew.textContent = 'Criar Nova Etiqueta';

// --- Line 5840 ---
addArea.appendChild(headerNew);

// --- Line 5841 ---


// --- Line 5842 ---
var row = el('div');

// --- Line 5843 ---
row.style.display = 'flex';

// --- Line 5844 ---
row.style.gap = '8px';

// --- Line 5845 ---
row.style.alignItems = 'center';

// --- Line 5846 ---


// --- Line 5847 ---
var colorPicker = el('input');

// --- Line 5848 ---
colorPicker.type = 'color';

// --- Line 5849 ---
colorPicker.id = 'newLabelColorPicker';

// --- Line 5850 ---
colorPicker.name = 'newLabelColorPicker';

// --- Line 5851 ---
colorPicker.value = '#9f9f9f';

// --- Line 5852 ---
colorPicker.style.border = 'none';

// --- Line 5853 ---
colorPicker.style.background = 'transparent';

// --- Line 5854 ---
colorPicker.style.width = '38px';

// --- Line 5855 ---
colorPicker.style.height = '38px';

// --- Line 5856 ---
colorPicker.style.cursor = 'pointer';

// --- Line 5858 ---
var labelInput = el('input');

// --- Line 5859 ---
labelInput.type = 'text';

// --- Line 5860 ---
labelInput.id = 'newLabelInput';

// --- Line 5861 ---
labelInput.name = 'newLabelInput';

// --- Line 5862 ---
labelInput.placeholder = 'Nome da Etiqueta';

// --- Line 5863 ---
labelInput.style.flex = '1';

// --- Line 5864 ---
labelInput.style.padding = '8px';

// --- Line 5865 ---
labelInput.style.background = 'var(--bg)';

// --- Line 5866 ---
labelInput.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 5867 ---
labelInput.style.borderRadius = '8px';

// --- Line 5868 ---
labelInput.style.color = '#fff';

// --- Line 5869 ---


// --- Line 5870 ---
var addBtn = el('button');

// --- Line 5871 ---
addBtn.type = 'button';

// --- Line 5872 ---
addBtn.textContent = 'Adicionar';

// --- Line 5873 ---
addBtn.style.padding = '8px 12px';

// --- Line 5874 ---
addBtn.style.background = 'var(--brand)';

// --- Line 5875 ---
addBtn.style.border = 'none';

// --- Line 5876 ---
addBtn.style.borderRadius = '8px';

// --- Line 5877 ---
addBtn.style.color = '#fff';

// --- Line 5878 ---
addBtn.style.cursor = 'pointer';

// --- Line 5879 ---


// --- Line 5880 ---
addBtn.onclick = function() {

// --- Line 5881 ---
const name = labelInput.value.trim();

// --- Line 5882 ---
const hex = colorPicker.value;

// --- Line 5883 ---
if (name) {

// --- Line 5884 ---
customColorLabels[hex] = name;

// --- Line 5885 ---
saveCustomLabels();

// --- Line 5886 ---
labelInput.value = '';

// --- Line 5887 ---
renderCustomLabels();

// --- Line 5888 ---
} else {

// --- Line 5889 ---
alert('Por favor, introduza um nome para a etiqueta.');

// --- Line 5890 ---
}

// --- Line 5891 ---
};

// --- Line 5892 ---


// --- Line 5893 ---
row.appendChild(colorPicker);

// --- Line 5894 ---
row.appendChild(labelInput);

// --- Line 5895 ---
row.appendChild(addBtn);

// --- Line 5896 ---
addArea.appendChild(row);

// --- Line 5897 ---
wrap.appendChild(addArea);

// --- Line 5899 ---
// Area de gest�o (excluir etiquetas)

// --- Line 5900 ---
var manageArea = el('div');

// --- Line 5901 ---
manageArea.style.display = 'none';

// --- Line 5902 ---
manageArea.style.flexDirection = 'column';

// --- Line 5903 ---
manageArea.style.gap = '6px';

// --- Line 5904 ---
manageArea.style.maxHeight = '150px';

// --- Line 5905 ---
manageArea.style.overflowY = 'auto';

// --- Line 5906 ---


// --- Line 5907 ---
function renderManageArea() {

// --- Line 5908 ---
manageArea.innerHTML = '';

// --- Line 5909 ---
Object.keys(customColorLabels).forEach(hex => {

// --- Line 5910 ---
var mRow = el('div');

// --- Line 5911 ---
mRow.style.display = 'flex';

// --- Line 5912 ---
mRow.style.justifyContent = 'space-between';

// --- Line 5913 ---
mRow.style.alignItems = 'center';

// --- Line 5914 ---
mRow.style.padding = '4px';

// --- Line 5915 ---
mRow.style.borderBottom = '1px solid #1c273a';

// --- Line 5916 ---


// --- Line 5917 ---
var labelSpan = el('span');

// --- Line 5918 ---
labelSpan.textContent = customColorLabels[hex] + ` (${hex})`;

// --- Line 5919 ---
labelSpan.style.color = hex;

// --- Line 5920 ---
labelSpan.style.fontWeight = 'bold';

// --- Line 5921 ---


// --- Line 5922 ---
var delBtn = el('button');

// --- Line 5923 ---
delBtn.type = 'button';

// --- Line 5924 ---
delBtn.textContent = '???';

// --- Line 5925 ---
delBtn.style.background = 'transparent';

// --- Line 5926 ---
delBtn.style.border = 'none';

// --- Line 5927 ---
delBtn.style.cursor = 'pointer';

// --- Line 5928 ---
delBtn.onclick = function() {

// --- Line 5929 ---
delete customColorLabels[hex];

// --- Line 5930 ---
saveCustomLabels();

// --- Line 5931 ---
renderCustomLabels();

// --- Line 5932 ---
renderManageArea();

// --- Line 5933 ---
};

// --- Line 5934 ---


// --- Line 5935 ---
mRow.appendChild(labelSpan);

// --- Line 5936 ---
mRow.appendChild(delBtn);

// --- Line 5937 ---
manageArea.appendChild(mRow);

// --- Line 5938 ---
});

// --- Line 5939 ---
}

// --- Line 5940 ---
renderManageArea();

// --- Line 5941 ---
wrap.appendChild(manageArea);

// --- Line 5942 ---


// --- Line 5943 ---
wrap._toggleManage = function(isManaging) {

// --- Line 5944 ---
if (isManaging) {

// --- Line 5945 ---
sectionPre.style.display = 'none';

// --- Line 5946 ---
sectionCustom.style.display = 'none';

// --- Line 5947 ---
addArea.style.display = 'none';

// --- Line 5948 ---
manageArea.style.display = 'flex';

// --- Line 5949 ---
renderManageArea();

// --- Line 5950 ---
} else {

// --- Line 5951 ---
sectionPre.style.display = 'block';

// --- Line 5952 ---
sectionCustom.style.display = 'block';

// --- Line 5953 ---
addArea.style.display = 'flex';

// --- Line 5954 ---
manageArea.style.display = 'none';

// --- Line 5955 ---
}

// --- Line 5956 ---
};

// --- Line 5958 ---
return wrap;

// --- Line 5959 ---
}, function (body, wrap) {

// --- Line 5960 ---
if (body._isManaging) {

// --- Line 5961 ---
return; // Se estiver no modo gest�o, o OK apenas fecha o modal ap�s salvar

// --- Line 5962 ---
}

// --- Line 5963 ---
var v = (body._chosen === undefined) ? (cards[0].dataset.labelColor || '') : body._chosen;

// --- Line 5964 ---
cards.forEach(function (c) { 

// --- Line 5965 ---
c.dataset.labelColor = v || ''; 

// --- Line 5966 ---
paintCard(c); 

// --- Line 5967 ---
});

// --- Line 5968 ---
persist();

// --- Line 5969 ---
});

// --- Line 5970 ---


// --- Line 5971 ---
const manageBtn = el('button'); 

// --- Line 5972 ---
manageBtn.textContent = 'Gerir Etiquetas ???'; 

// --- Line 5973 ---
manageBtn.className = 'manage-labels-btn';

// --- Line 5974 ---


// --- Line 5975 ---
let isManaging = false;

// --- Line 5976 ---
manageBtn.onclick = function (e) {

// --- Line 5977 ---
e.preventDefault(); 

// --- Line 5978 ---
isManaging = !isManaging;

// --- Line 5979 ---
modalElements.body._isManaging = isManaging;

// --- Line 5980 ---
modalElements.body._toggleManage(isManaging);

// --- Line 5981 ---
manageBtn.textContent = isManaging ? 'Voltar � Sele��o' : 'Gerir Etiquetas ???';

// --- Line 5982 ---
modalElements.okButton.textContent = isManaging ? 'Conclu�do' : 'OK';

// --- Line 5983 ---
};

// --- Line 5984 ---
modalElements.wrap.querySelector('.row').prepend(manageBtn);

// --- Line 5985 ---
}

// --- Line 5986 ---


// --- Line 5987 ---
function openDateDialog(cards) { if (!cards.length) return; showModal('Editar data', function () { 
       var r = el('div'); var i = el('input'); i.type = 'date'; i.id = 'editDateInput'; i.name = 'editDateInput'; if 
       (cards[0].dataset.due) i.value = cards[0].dataset.due; r.appendChild(i); return r; }, function (r, wrap) { var 
       v = r.querySelector('input').value; cards.forEach(function (c) { c.dataset.due = v || ''; paintCard(c); }); 
       applyFilters(); }); }

// --- Line 5988 ---


// --- Line 5989 ---
function generateRecurrences(parentCard) {

// --- Line 5990 ---
const parentId = parentCard.dataset.cardId;

// --- Line 5991 ---
if (!parentId) return;

// --- Line 5992 ---


// --- Line 5993 ---
const parentDateStr = parentCard.dataset.when.split('T')[0];

// --- Line 5994 ---
const parentTimeSuffix = parentCard.dataset.when.includes('T') ? 
       parentCard.dataset.when.split('T')[1] : '';

// --- Line 5996 ---
// Delete all future child cards belonging to this parent

// --- Line 5997 ---
allCards = allCards.filter(c => {

// --- Line 5998 ---
if (c.dataset.recurrenceParent === parentId) {

// --- Line 5999 ---
c.remove();

// --- Line 6000 ---
return false;

// --- Line 6001 ---
}

// --- Line 6002 ---
return true;

// --- Line 6003 ---
});

// --- Line 6004 ---


// --- Line 6005 ---
const recurrenceVal = parentCard.dataset.recurrence;

// --- Line 6006 ---
if (!recurrenceVal || recurrenceVal === 'none') {

// --- Line 6007 ---
return;

// --- Line 6008 ---
}

// --- Line 6009 ---


// --- Line 6010 ---
let rule = null;

// --- Line 6011 ---
if (recurrenceVal.startsWith('{')) {

// --- Line 6012 ---
try {

// --- Line 6013 ---
rule = JSON.parse(recurrenceVal);

// --- Line 6014 ---
} catch (e) {

// --- Line 6015 ---
console.error("Error parsing recurrence JSON", e);

// --- Line 6016 ---
}

// --- Line 6017 ---
} else {

// --- Line 6018 ---
// Fallback to simple predefined recurrence configurations

// --- Line 6019 ---
if (recurrenceVal === 'daily') {

// --- Line 6020 ---
rule = { freq: 'daily', interval: 1, endType: 'never' };

// --- Line 6021 ---
} else if (recurrenceVal === 'weekdays') {

// --- Line 6022 ---
rule = { freq: 'weekly', interval: 1, days: [1, 2, 3, 4, 5], endType: 'never' };

// --- Line 6023 ---
} else if (recurrenceVal === 'weekly') {

// --- Line 6024 ---
const sDate = new Date(parentDateStr + 'T12:00:00');

// --- Line 6025 ---
rule = { freq: 'weekly', interval: 1, days: [sDate.getDay()], endType: 'never' };

// --- Line 6026 ---
} else if (recurrenceVal === 'monthly') {

// --- Line 6027 ---
rule = { freq: 'monthly', interval: 1, endType: 'never' };

// --- Line 6028 ---
}

// --- Line 6029 ---
}

// --- Line 6030 ---


// --- Line 6031 ---
if (!rule) return;

// --- Line 6032 ---


// --- Line 6033 ---
const startDate = new Date(parentDateStr + 'T12:00:00');

// --- Line 6034 ---
let currentDate = new Date(startDate);

// --- Line 6035 ---
let count = 0;

// --- Line 6036 ---


// --- Line 6037 ---
let maxInstances = 365; // safety limit

// --- Line 6038 ---
let instancesToGenerate = 30; // default for daily/weekdays

// --- Line 6039 ---
if (rule.freq === 'weekly') instancesToGenerate = 12;

// --- Line 6040 ---
if (rule.freq === 'monthly') instancesToGenerate = 12;

// --- Line 6041 ---
if (rule.freq === 'yearly') instancesToGenerate = 5;

// --- Line 6042 ---


// --- Line 6043 ---
if (rule.endType === 'count') {

// --- Line 6044 ---
instancesToGenerate = Math.min(rule.endCount || 1, maxInstances);

// --- Line 6045 ---
}

// --- Line 6047 ---
const endLimitDate = (rule.endType === 'date' && rule.endDate) ? new Date(rule.endDate + 
       'T23:59:59') : null;

// --- Line 6049 ---
while (count < instancesToGenerate) {

// --- Line 6050 ---
if (rule.freq === 'daily') {

// --- Line 6051 ---
currentDate.setDate(currentDate.getDate() + rule.interval);

// --- Line 6052 ---
} else if (rule.freq === 'weekly') {

// --- Line 6053 ---
let found = false;

// --- Line 6054 ---
for (let attempt = 0; attempt < 365; attempt++) {

// --- Line 6055 ---
currentDate.setDate(currentDate.getDate() + 1);

// --- Line 6056 ---


// --- Line 6057 ---
const startTemp = new Date(startDate.getFullYear(), startDate.getMonth(), 
       startDate.getDate(), 12, 0, 0);

// --- Line 6058 ---
const currentTemp = new Date(currentDate.getFullYear(), currentDate.getMonth(), 
       currentDate.getDate(), 12, 0, 0);

// --- Line 6059 ---


// --- Line 6060 ---
const startSun = new Date(startTemp);

// --- Line 6061 ---
startSun.setDate(startSun.getDate() - startSun.getDay());

// --- Line 6062 ---


// --- Line 6063 ---
const currentSun = new Date(currentTemp);

// --- Line 6064 ---
currentSun.setDate(currentSun.getDate() - currentSun.getDay());

// --- Line 6065 ---


// --- Line 6066 ---
const msDiff = currentSun.getTime() - startSun.getTime();

// --- Line 6067 ---
const weeksDiff = Math.round(msDiff / (7 * 24 * 60 * 60 * 1000));

// --- Line 6068 ---


// --- Line 6069 ---
if (weeksDiff % rule.interval === 0) {

// --- Line 6070 ---
const dayOfWeek = currentDate.getDay();

// --- Line 6071 ---
if (!rule.days || rule.days.length === 0 || rule.days.includes(dayOfWeek)) {

// --- Line 6072 ---
found = true;

// --- Line 6073 ---
break;

// --- Line 6074 ---
}

// --- Line 6075 ---
}

// --- Line 6076 ---
}

// --- Line 6077 ---
if (!found) break;

// --- Line 6078 ---
} else if (rule.freq === 'monthly') {

// --- Line 6079 ---
currentDate.setMonth(currentDate.getMonth() + rule.interval);

// --- Line 6080 ---
} else if (rule.freq === 'yearly') {

// --- Line 6081 ---
currentDate.setFullYear(currentDate.getFullYear() + rule.interval);

// --- Line 6082 ---
} else {

// --- Line 6083 ---
break;

// --- Line 6084 ---
}

// --- Line 6085 ---


// --- Line 6086 ---
if (endLimitDate && currentDate > endLimitDate) {

// --- Line 6087 ---
break;

// --- Line 6088 ---
}

// --- Line 6089 ---


// --- Line 6090 ---
const dateStr = currentDate.toISOString().slice(0, 10);

// --- Line 6091 ---
const whenVal = dateStr + 'T' + parentTimeSuffix;

// --- Line 6092 ---


// --- Line 6093 ---
const childData = {

// --- Line 6094 ---
text: (parentCard.querySelector('.text') ? 
       parentCard.querySelector('.text').textContent : '').trim(),

// --- Line 6095 ---
color: parentCard.dataset.color || '',

// --- Line 6096 ---
labelColor: parentCard.dataset.labelColor || '',

// --- Line 6097 ---
due: parentCard.dataset.due || '',

// --- Line 6098 ---
when: whenVal,

// --- Line 6099 ---
timerTotal: parentCard.dataset.timerTotal || '',

// --- Line 6100 ---
timerLeft: parentCard.dataset.timerLeft || '',

// --- Line 6101 ---
timerState: 'stopped',

// --- Line 6102 ---
timerEnd: '',

// --- Line 6103 ---
completed: 'false',

// --- Line 6104 ---
history: JSON.stringify([{ action: 'Criado por recorr�ncia personalizada', time: 
       Date.now() }]),

// --- Line 6105 ---
boardId: parentCard.dataset.boardId || '',

// --- Line 6106 ---
description: parentCard.dataset.description || '',

// --- Line 6107 ---
duration: parentCard.dataset.duration || '',

// --- Line 6108 ---
recurrence: 'none',

// --- Line 6109 ---
cardId: 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),

// --- Line 6110 ---
recurrenceParent: parentId,

// --- Line 6111 ---
alertEnabled: parentCard.dataset.alertEnabled || 'false',

// --- Line 6112 ---
alertValue: parentCard.dataset.alertValue || '15',

// --- Line 6113 ---
alertUnit: parentCard.dataset.alertUnit || 'minutos',

// --- Line 6114 ---
alertFired: 'false'

// --- Line 6115 ---
};

// --- Line 6116 ---


// --- Line 6117 ---
createCard(childData);

// --- Line 6118 ---
count++;

// --- Line 6119 ---
}

// --- Line 6120 ---
}

// --- Line 6122 ---
function openCustomRecurrenceDialog(currentRule, onSave, onCancel) {

// --- Line 6123 ---
let recRule = { freq: 'weekly', interval: 1, days: [], endType: 'never', endDate: '', endCount: 
       1 };

// --- Line 6124 ---
if (currentRule) {

// --- Line 6125 ---
if (typeof currentRule === 'string' && currentRule.startsWith('{')) {

// --- Line 6126 ---
try { recRule = JSON.parse(currentRule); } catch (e) {}

// --- Line 6127 ---
} else if (typeof currentRule === 'object') {

// --- Line 6128 ---
recRule = { ...recRule, ...currentRule };

// --- Line 6129 ---
}

// --- Line 6130 ---
}

// --- Line 6131 ---


// --- Line 6132 ---
const modalElements = showModal('Recorr�ncia', function () {

// --- Line 6133 ---
const r = el('div');

// --- Line 6134 ---
r.style.display = 'flex';

// --- Line 6135 ---
r.style.flexDirection = 'column';

// --- Line 6136 ---
r.style.gap = '14px';

// --- Line 6137 ---
r.style.minWidth = '320px';

// --- Line 6138 ---
r.style.maxWidth = '400px';

// --- Line 6139 ---
r.style.color = '#fff';

// --- Line 6140 ---


// --- Line 6141 ---
// 1. Repete a cada Row

// --- Line 6142 ---
const intervalRow = el('div');

// --- Line 6143 ---
intervalRow.style.display = 'flex';

// --- Line 6144 ---
intervalRow.style.alignItems = 'center';

// --- Line 6145 ---
intervalRow.style.gap = '8px';

// --- Line 6146 ---
intervalRow.style.fontSize = '14px';

// --- Line 6147 ---
intervalRow.innerHTML = `

// --- Line 6148 ---
<span>Repete a cada</span>

// --- Line 6149 ---
<input type="number" id="recInterval" name="recInterval" value="${recRule.interval || 
       1}" min="1" style="width: 60px; border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: 
       #fff; padding: 6px 8px; border-radius: 6px; font-size: 14px;" />

// --- Line 6150 ---
<select id="recFreq" name="recFreq" style="border: 1px solid rgba(255, 255, 255, 0.15); 
       background: var(--bg); color: #fff; padding: 6px 8px; border-radius: 6px; font-size: 14px; cursor: pointer;">

// --- Line 6151 ---
<option value="daily" ${recRule.freq === 'daily' ? 'selected' : ''}>dia(s)</option>

// --- Line 6152 ---
<option value="weekly" ${recRule.freq === 'weekly' ? 'selected' : 
       ''}>semana(s)</option>

// --- Line 6153 ---
<option value="monthly" ${recRule.freq === 'monthly' ? 'selected' : 
       ''}>m�s(es)</option>

// --- Line 6154 ---
<option value="yearly" ${recRule.freq === 'yearly' ? 'selected' : 
       ''}>ano(s)</option>

// --- Line 6155 ---
</select>

// --- Line 6156 ---
`;

// --- Line 6157 ---
const recIntervalInp = intervalRow.querySelector('#recInterval');

// --- Line 6158 ---
const recFreqSelect = intervalRow.querySelector('#recFreq');

// --- Line 6159 ---
r.appendChild(intervalRow);

// --- Line 6160 ---


// --- Line 6161 ---
// 2. Repetir �s/aos Row (Weekdays selector)

// --- Line 6162 ---
const weekdaysRow = el('div');

// --- Line 6163 ---
weekdaysRow.style.display = recRule.freq === 'weekly' ? 'flex' : 'none';

// --- Line 6164 ---
weekdaysRow.style.flexDirection = 'column';

// --- Line 6165 ---
weekdaysRow.style.gap = '8px';

// --- Line 6166 ---
weekdaysRow.innerHTML = `<span style="font-size: 13px; color: #9fb3d2;">Repetir 
       �s/aos</span>`;

// --- Line 6167 ---


// --- Line 6168 ---
const daysGrid = el('div');

// --- Line 6169 ---
daysGrid.style.display = 'flex';

// --- Line 6170 ---
daysGrid.style.gap = '8px';

// --- Line 6171 ---
daysGrid.style.justifyContent = 'space-between';

// --- Line 6172 ---


// --- Line 6173 ---
const weekdayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// --- Line 6174 ---
const weekdayTitles = ['Domingo', 'Segunda', 'Ter�a', 'Quarta', 'Quinta', 'Sexta', 
       'S�bado'];

// --- Line 6175 ---
const chosenDays = new Set(recRule.days || []);

// --- Line 6176 ---


// --- Line 6177 ---
weekdayNames.forEach((name, idx) => {

// --- Line 6178 ---
const dayBtn = el('button');

// --- Line 6179 ---
dayBtn.type = 'button';

// --- Line 6180 ---
dayBtn.className = 'weekday-btn';

// --- Line 6181 ---
if (chosenDays.has(idx)) {

// --- Line 6182 ---
dayBtn.classList.add('selected');

// --- Line 6183 ---
}

// --- Line 6184 ---
dayBtn.title = weekdayTitles[idx];

// --- Line 6185 ---
dayBtn.textContent = name;

// --- Line 6186 ---


// --- Line 6187 ---
dayBtn.onclick = function() {

// --- Line 6188 ---
if (chosenDays.has(idx)) {

// --- Line 6189 ---
chosenDays.delete(idx);

// --- Line 6190 ---
dayBtn.classList.remove('selected');

// --- Line 6191 ---
} else {

// --- Line 6192 ---
chosenDays.add(idx);

// --- Line 6193 ---
dayBtn.classList.add('selected');

// --- Line 6194 ---
}

// --- Line 6195 ---
};

// --- Line 6196 ---
daysGrid.appendChild(dayBtn);

// --- Line 6197 ---
});

// --- Line 6198 ---
weekdaysRow.appendChild(daysGrid);

// --- Line 6199 ---
r.appendChild(weekdaysRow);

// --- Line 6200 ---


// --- Line 6201 ---
recFreqSelect.addEventListener('change', function() {

// --- Line 6202 ---
if (recFreqSelect.value === 'weekly') {

// --- Line 6203 ---
weekdaysRow.style.display = 'flex';

// --- Line 6204 ---
} else {

// --- Line 6205 ---
weekdaysRow.style.display = 'none';

// --- Line 6206 ---
}

// --- Line 6207 ---
});

// --- Line 6208 ---


// --- Line 6209 ---
// 3. Termina Section

// --- Line 6210 ---
const endSection = el('div');

// --- Line 6211 ---
endSection.style.display = 'flex';

// --- Line 6212 ---
endSection.style.flexDirection = 'column';

// --- Line 6213 ---
endSection.style.gap = '8px';

// --- Line 6214 ---
endSection.style.marginTop = '6px';

// --- Line 6215 ---
endSection.style.borderTop = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6216 ---
endSection.style.paddingTop = '10px';

// --- Line 6217 ---


// --- Line 6218 ---
const endTitle = el('span');

// --- Line 6219 ---
endTitle.style.fontSize = '13px';

// --- Line 6220 ---
endTitle.style.color = '#9fb3d2';

// --- Line 6221 ---
endTitle.style.fontWeight = '500';

// --- Line 6222 ---
endTitle.textContent = 'Termina';

// --- Line 6223 ---
endSection.appendChild(endTitle);

// --- Line 6224 ---


// --- Line 6225 ---
// Radio 1: Nunca

// --- Line 6226 ---
const neverLabel = el('label');

// --- Line 6227 ---
neverLabel.style.display = 'flex';

// --- Line 6228 ---
neverLabel.style.alignItems = 'center';

// --- Line 6229 ---
neverLabel.style.gap = '6px';

// --- Line 6230 ---
neverLabel.style.fontSize = '14px';

// --- Line 6231 ---
neverLabel.style.cursor = 'pointer';

// --- Line 6232 ---
neverLabel.innerHTML = `<input type="radio" id="recEndNever" name="recEndType" 
       value="never" ${recRule.endType === 'never' ? 'checked' : ''} /> Nunca`;

// --- Line 6233 ---
endSection.appendChild(neverLabel);

// --- Line 6235 ---
// Radio 2: Em

// --- Line 6236 ---
const dateLabel = el('label');

// --- Line 6237 ---
dateLabel.style.display = 'flex';

// --- Line 6238 ---
dateLabel.style.alignItems = 'center';

// --- Line 6239 ---
dateLabel.style.gap = '6px';

// --- Line 6240 ---
dateLabel.style.fontSize = '14px';

// --- Line 6241 ---
dateLabel.style.cursor = 'pointer';

// --- Line 6242 ---
dateLabel.innerHTML = `

// --- Line 6243 ---
<input type="radio" id="recEndOnDate" name="recEndType" value="date" ${recRule.endType 
       === 'date' ? 'checked' : ''} /> Em

// --- Line 6244 ---
<input type="date" id="recEndDate" name="recEndDate" value="${recRule.endDate || new 
       Date().toISOString().slice(0, 10)}" style="border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); 
       color: #fff; padding: 4px 6px; border-radius: 6px; font-size: 13px;" />

// --- Line 6245 ---
`;

// --- Line 6246 ---
endSection.appendChild(dateLabel);

// --- Line 6247 ---


// --- Line 6248 ---
// Radio 3: Ap�s

// --- Line 6249 ---
const countLabel = el('label');

// --- Line 6250 ---
countLabel.style.display = 'flex';

// --- Line 6251 ---
countLabel.style.alignItems = 'center';

// --- Line 6252 ---
countLabel.style.gap = '6px';

// --- Line 6253 ---
countLabel.style.fontSize = '14px';

// --- Line 6254 ---
countLabel.style.cursor = 'pointer';

// --- Line 6255 ---
countLabel.innerHTML = `

// --- Line 6256 ---
<input type="radio" id="recEndAfterCount" name="recEndType" value="count" 
       ${recRule.endType === 'count' ? 'checked' : ''} /> Ap�s

// --- Line 6257 ---
<input type="number" id="recEndCount" name="recEndCount" value="${recRule.endCount || 
       1}" min="1" style="width: 60px; border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: 
       #fff; padding: 4px 6px; border-radius: 6px; font-size: 13px;" />

// --- Line 6258 ---
<span>ocorr�ncias</span>

// --- Line 6259 ---
`;

// --- Line 6260 ---
endSection.appendChild(countLabel);

// --- Line 6261 ---


// --- Line 6262 ---
r.appendChild(endSection);

// --- Line 6263 ---


// --- Line 6264 ---
return r;

// --- Line 6265 ---
}, function (body, wrap) {

// --- Line 6266 ---
const freq = body.querySelector('#recFreq').value;

// --- Line 6267 ---
const interval = parseInt(body.querySelector('#recInterval').value, 10) || 1;

// --- Line 6268 ---
const days = freq === 'weekly' ? 
       Array.from(body.querySelectorAll('.weekday-btn.selected')).map(btn => {

// --- Line 6269 ---
const idx = ['Domingo', 'Segunda', 'Ter�a', 'Quarta', 'Quinta', 'Sexta', 
       'S�bado'].indexOf(btn.title);

// --- Line 6270 ---
return idx !== -1 ? idx : 0;

// --- Line 6271 ---
}) : [];

// --- Line 6272 ---


// --- Line 6273 ---
const endTypeRadio = body.querySelector('input[name="recEndType"]:checked');

// --- Line 6274 ---
const endType = endTypeRadio ? endTypeRadio.value : 'never';

// --- Line 6275 ---
const endDate = body.querySelector('#recEndDate').value;

// --- Line 6276 ---
const endCount = parseInt(body.querySelector('#recEndCount').value, 10) || 1;

// --- Line 6277 ---


// --- Line 6278 ---
const newRule = {

// --- Line 6279 ---
freq: freq,

// --- Line 6280 ---
interval: interval,

// --- Line 6281 ---
days: days,

// --- Line 6282 ---
endType: endType,

// --- Line 6283 ---
endDate: endDate,

// --- Line 6284 ---
endCount: endCount

// --- Line 6285 ---
};

// --- Line 6286 ---
onSave(newRule);

// --- Line 6287 ---
});

// --- Line 6288 ---


// --- Line 6289 ---
modalElements.okButton.textContent = 'Conclu�do';

// --- Line 6290 ---
modalElements.cancelButton.onclick = function () {

// --- Line 6291 ---
document.body.removeChild(modalElements.wrap);

// --- Line 6292 ---
if (onCancel) onCancel();

// --- Line 6293 ---
};

// --- Line 6294 ---
}

// --- Line 6295 ---


// --- Line 6296 ---
function openAlertDialog(cardOrData, onSave, onCancel) {

// --- Line 6297 ---
const predefinedOptions = [

// --- Line 6298 ---
{ text: 'No hor�rio do evento', val: 0, unit: 'minutos' },

// --- Line 6299 ---
{ text: '5 minutos antes', val: 5, unit: 'minutos' },

// --- Line 6300 ---
{ text: '15 minutos antes', val: 15, unit: 'minutos' },

// --- Line 6301 ---
{ text: '30 minutos antes', val: 30, unit: 'minutos' },

// --- Line 6302 ---
{ text: '1 hora antes', val: 1, unit: 'horas' },

// --- Line 6303 ---
{ text: '2 horas antes', val: 2, unit: 'horas' },

// --- Line 6304 ---
{ text: '1 dia antes', val: 1, unit: 'dias' },

// --- Line 6305 ---
{ text: 'Personalizado...', val: -1, unit: 'custom' }

// --- Line 6306 ---
];

// --- Line 6307 ---
const dataset = cardOrData.dataset ? cardOrData.dataset : cardOrData;

// --- Line 6308 ---
const isEnabled = dataset.alertEnabled === 'true';

// --- Line 6309 ---
const currentVal = parseInt(dataset.alertValue || '15', 10);

// --- Line 6310 ---
const currentUnit = dataset.alertUnit || 'minutos';

// --- Line 6311 ---


// --- Line 6312 ---
const modalElements = showModal('Alerta', function () {

// --- Line 6313 ---
const r = el('div');

// --- Line 6314 ---
r.style.display = 'flex';

// --- Line 6315 ---
r.style.flexDirection = 'column';

// --- Line 6316 ---
r.style.gap = '12px';

// --- Line 6317 ---
r.style.minWidth = '320px';

// --- Line 6318 ---
r.style.maxWidth = '400px';

// --- Line 6319 ---
r.style.color = '#fff';

// --- Line 6320 ---


// --- Line 6321 ---
// 1. Toggle switch row

// --- Line 6322 ---
const toggleRow = el('div', 'premium-switch-container');

// --- Line 6323 ---
toggleRow.innerHTML = `

// --- Line 6324 ---
<span class="premium-switch-label">Ativado</span>

// --- Line 6325 ---
<label class="premium-switch">

// --- Line 6326 ---
<input type="checkbox" id="alertSubEnabled" name="alertSubEnabled" ${isEnabled ? 
       'checked' : ''}>

// --- Line 6327 ---
<span class="premium-slider"></span>

// --- Line 6328 ---
</label>

// --- Line 6329 ---
`;

// --- Line 6330 ---
const enabledCheckbox = toggleRow.querySelector('#alertSubEnabled');

// --- Line 6331 ---
r.appendChild(toggleRow);

// --- Line 6332 ---


// --- Line 6333 ---
// Options Container

// --- Line 6334 ---
const optionsContainer = el('div');

// --- Line 6335 ---
optionsContainer.style.display = isEnabled ? 'flex' : 'none';

// --- Line 6336 ---
optionsContainer.style.flexDirection = 'column';

// --- Line 6337 ---
optionsContainer.style.gap = '6px';

// --- Line 6338 ---
r.appendChild(optionsContainer);

// --- Line 6339 ---


// --- Line 6340 ---
// Toggling options container display

// --- Line 6341 ---
enabledCheckbox.addEventListener('change', function() {

// --- Line 6342 ---
if (enabledCheckbox.checked) {

// --- Line 6343 ---
optionsContainer.style.display = 'flex';

// --- Line 6344 ---
} else {

// --- Line 6345 ---
optionsContainer.style.display = 'none';

// --- Line 6346 ---
}

// --- Line 6347 ---
});

// --- Line 6348 ---


// --- Line 6349 ---
// Predefined options list

// --- Line 6350 ---
const predefinedOptions = [

// --- Line 6351 ---
{ text: 'No hor�rio do evento', val: 0, unit: 'minutos' },

// --- Line 6352 ---
{ text: '5 minutos antes', val: 5, unit: 'minutos' },

// --- Line 6353 ---
{ text: '15 minutos antes', val: 15, unit: 'minutos' },

// --- Line 6354 ---
{ text: '30 minutos antes', val: 30, unit: 'minutos' },

// --- Line 6355 ---
{ text: '1 hora antes', val: 1, unit: 'horas' },

// --- Line 6356 ---
{ text: '2 horas antes', val: 2, unit: 'horas' },

// --- Line 6357 ---
{ text: '1 dia antes', val: 1, unit: 'dias' },

// --- Line 6358 ---
{ text: 'Personalizado...', val: -1, unit: 'custom' }

// --- Line 6359 ---
];

// --- Line 6360 ---


// --- Line 6361 ---
let matchedIdx = -1;

// --- Line 6362 ---
predefinedOptions.forEach((opt, idx) => {

// --- Line 6363 ---
if (opt.val !== -1 && currentVal === opt.val && currentUnit === opt.unit) {

// --- Line 6364 ---
matchedIdx = idx;

// --- Line 6365 ---
}

// --- Line 6366 ---
});

// --- Line 6367 ---
if (matchedIdx === -1 && isEnabled) {

// --- Line 6368 ---
matchedIdx = predefinedOptions.length - 1; 

// --- Line 6369 ---
} else if (!isEnabled) {

// --- Line 6370 ---
matchedIdx = 2; // Default to 15m

// --- Line 6371 ---
}

// --- Line 6373 ---
// Custom fields row

// --- Line 6374 ---
const customFields = el('div');

// --- Line 6375 ---
customFields.id = 'alertCustomFieldsSub';

// --- Line 6376 ---
customFields.style.display = matchedIdx === predefinedOptions.length - 1 ? 'flex' : 'none';

// --- Line 6377 ---
customFields.style.flexDirection = 'column';

// --- Line 6378 ---
customFields.style.gap = '6px';

// --- Line 6379 ---
customFields.style.padding = '10px';

// --- Line 6380 ---
customFields.style.background = '#0a1424';

// --- Line 6381 ---
customFields.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6382 ---
customFields.style.borderRadius = '8px';

// --- Line 6383 ---
customFields.style.marginTop = '4px';

// --- Line 6384 ---
customFields.innerHTML = `

// --- Line 6385 ---
<span style="font-size: 12px; color: #9fb3d2;">Tempo personalizado:</span>

// --- Line 6386 ---
<div style="display: flex; gap: 8px; align-items: center;">

// --- Line 6387 ---
<input type="number" id="alertCustomValSub" name="alertCustomValSub" min="1" 
       value="${matchedIdx === predefinedOptions.length - 1 ? currentVal : 15}" style="width: 70px; border: 1px solid 
       rgba(255, 255, 255, 0.15); background: var(--bg); color: #fff; padding: 6px 8px; border-radius: 6px; font-size: 
       14px;" />

// --- Line 6388 ---
<select id="alertCustomUnitSub" name="alertCustomUnitSub" style="flex:1; border: 
       1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: #fff; padding: 6px 8px; border-radius: 6px; 
       font-size: 14px; cursor: pointer;">

// --- Line 6389 ---
<option value="minutos" ${currentUnit === 'minutos' ? 'selected' : ''}>minutos 
       antes</option>

// --- Line 6390 ---
<option value="horas" ${currentUnit === 'horas' ? 'selected' : ''}>horas 
       antes</option>

// --- Line 6391 ---
<option value="dias" ${currentUnit === 'dias' ? 'selected' : ''}>dias 
       antes</option>

// --- Line 6392 ---
<option value="semanas" ${currentUnit === 'semanas' ? 'selected' : ''}>semanas 
       antes</option>

// --- Line 6393 ---
</select>

// --- Line 6394 ---
</div>

// --- Line 6395 ---
`;

// --- Line 6396 ---


// --- Line 6397 ---
// Render list of choices

// --- Line 6398 ---
predefinedOptions.forEach((opt, idx) => {

// --- Line 6399 ---
const optDiv = el('div', 'alert-option-item');

// --- Line 6400 ---
if (idx === matchedIdx) {

// --- Line 6401 ---
optDiv.classList.add('selected');

// --- Line 6402 ---
}

// --- Line 6403 ---
optDiv.innerHTML = `

// --- Line 6404 ---
<span>${opt.text}</span>

// --- Line 6405 ---
<span class="check-mark">?</span>

// --- Line 6406 ---
`;

// --- Line 6407 ---
optDiv.onclick = function () {

// --- Line 6408 ---
r.querySelectorAll('.alert-option-item').forEach(item => 
       item.classList.remove('selected'));

// --- Line 6409 ---
optDiv.classList.add('selected');

// --- Line 6410 ---
if (opt.unit === 'custom') {

// --- Line 6411 ---
customFields.style.display = 'flex';

// --- Line 6412 ---
} else {

// --- Line 6413 ---
customFields.style.display = 'none';

// --- Line 6414 ---
}

// --- Line 6415 ---
};

// --- Line 6416 ---
optionsContainer.appendChild(optDiv);

// --- Line 6417 ---
});

// --- Line 6418 ---


// --- Line 6419 ---
optionsContainer.appendChild(customFields);

// --- Line 6420 ---


// --- Line 6421 ---
// 2. Tipo de alerta section

// --- Line 6422 ---
const alertTypeSection = el('div');

// --- Line 6423 ---
alertTypeSection.style.marginTop = '10px';

// --- Line 6424 ---
alertTypeSection.style.borderTop = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6425 ---
alertTypeSection.style.paddingTop = '10px';

// --- Line 6426 ---
alertTypeSection.innerHTML = `

// --- Line 6427 ---
<span style="font-size: 13px; color: #9fb3d2; font-weight: 500; display: block; 
       margin-bottom: 6px;">Tipo de alerta</span>

// --- Line 6428 ---
<div style="display: flex; align-items: center; justify-content: space-between; 
       padding: 10px 12px; background: var(--bg); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px;">

// --- Line 6429 ---
<span style="font-size: 14px;">Notifica��o (Pop-up e Som)</span>

// --- Line 6430 ---
<span style="color: #1976d2; font-weight: bold;">?</span>

// --- Line 6431 ---
</div>

// --- Line 6432 ---
`;

// --- Line 6433 ---
optionsContainer.appendChild(alertTypeSection);

// --- Line 6434 ---


// --- Line 6435 ---
return r;

// --- Line 6436 ---
}, function (body, wrap) {

// --- Line 6437 ---
const enabledCheckboxSub = body.querySelector('#alertSubEnabled');

// --- Line 6438 ---
const enabled = enabledCheckboxSub ? enabledCheckboxSub.checked : false;

// --- Line 6439 ---
let val = 15;

// --- Line 6440 ---
let unit = 'minutos';

// --- Line 6441 ---


// --- Line 6442 ---
if (enabled) {

// --- Line 6443 ---
const selectedOpt = body.querySelector('.alert-option-item.selected');

// --- Line 6444 ---
const selectedIdx = 
       Array.from(body.querySelectorAll('.alert-option-item')).indexOf(selectedOpt);

// --- Line 6445 ---
const opt = predefinedOptions[selectedIdx];

// --- Line 6446 ---


// --- Line 6447 ---
if (opt && opt.unit !== 'custom') {

// --- Line 6448 ---
val = opt.val;

// --- Line 6449 ---
unit = opt.unit;

// --- Line 6450 ---
} else {

// --- Line 6451 ---
val = parseInt(body.querySelector('#alertCustomValSub').value, 10) || 15;

// --- Line 6452 ---
unit = body.querySelector('#alertCustomUnitSub').value;

// --- Line 6453 ---
}

// --- Line 6454 ---
}

// --- Line 6455 ---


// --- Line 6456 ---
onSave({

// --- Line 6457 ---
alertEnabled: enabled,

// --- Line 6458 ---
alertValue: val,

// --- Line 6459 ---
alertUnit: unit

// --- Line 6460 ---
});

// --- Line 6461 ---
});

// --- Line 6462 ---


// --- Line 6463 ---
modalElements.okButton.textContent = 'Conclu�do';

// --- Line 6464 ---
modalElements.cancelButton.onclick = function () {

// --- Line 6465 ---
document.body.removeChild(modalElements.wrap);

// --- Line 6466 ---
if (onCancel) onCancel();

// --- Line 6467 ---
};

// --- Line 6468 ---
}

// --- Line 6469 ---


// --- Line 6470 ---
function openAgendaDialog(card) {

// --- Line 6471 ---
if (!card) return;

// --- Line 6472 ---


// --- Line 6473 ---
if (!card.dataset.cardId) {

// --- Line 6474 ---
card.dataset.cardId = 'card_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

// --- Line 6475 ---
}

// --- Line 6476 ---


// --- Line 6477 ---
const whenVal = card.dataset.when || '';

// --- Line 6478 ---
let cardDate = '';

// --- Line 6479 ---
let cardTime = '09:00';

// --- Line 6480 ---
let isGoal = false;

// --- Line 6481 ---
let isAllDay = false;

// --- Line 6482 ---


// --- Line 6483 ---
if (whenVal.includes('T')) {

// --- Line 6484 ---
const parts = whenVal.split('T');

// --- Line 6485 ---
cardDate = parts[0];

// --- Line 6486 ---
const timePart = parts[1] || '';

// --- Line 6487 ---
if (timePart === 'GOAL') {

// --- Line 6488 ---
isGoal = true;

// --- Line 6489 ---
isAllDay = true;

// --- Line 6490 ---
} else if (timePart === '') {

// --- Line 6491 ---
isAllDay = true;

// --- Line 6492 ---
} else {

// --- Line 6493 ---
cardTime = timePart;

// --- Line 6494 ---
}

// --- Line 6495 ---
}

// --- Line 6496 ---
if (!cardDate) {

// --- Line 6497 ---
cardDate = new Date().toISOString().slice(0, 10);

// --- Line 6498 ---
}

// --- Line 6499 ---


// --- Line 6500 ---
const currentRecurrence = card.dataset.recurrence || 'none';

// --- Line 6501 ---
const currentDuration = card.dataset.duration || '60';

// --- Line 6502 ---
const currentDescription = card.dataset.description || '';

// --- Line 6503 ---


// --- Line 6504 ---
const currentAlertEnabled = card.dataset.alertEnabled === 'true';

// --- Line 6505 ---
const currentAlertValue = card.dataset.alertValue || '15';

// --- Line 6506 ---
const currentAlertUnit = card.dataset.alertUnit || 'minutos';

// --- Line 6507 ---


// --- Line 6508 ---
let isCustomRecurrence = currentRecurrence.startsWith('{');

// --- Line 6509 ---


// --- Line 6510 ---
let tempAlertEnabled = currentAlertEnabled;

// --- Line 6511 ---
let tempAlertValue = parseInt(currentAlertValue, 10);

// --- Line 6512 ---
if (isNaN(tempAlertValue)) tempAlertValue = 15;

// --- Line 6513 ---
let tempAlertUnit = currentAlertUnit;

// --- Line 6514 ---
let tempRecurrenceValue = currentRecurrence;

// --- Line 6515 ---


// --- Line 6516 ---
var modalElements = showModal('Agendar / Recorr�ncia', function () {

// --- Line 6517 ---
var r = el('div');

// --- Line 6518 ---
r.style.display = 'flex';

// --- Line 6519 ---
r.style.flexDirection = 'column';

// --- Line 6520 ---
r.style.gap = '14px';

// --- Line 6521 ---
r.style.minWidth = '360px';

// --- Line 6522 ---
r.style.maxWidth = '460px';

// --- Line 6523 ---
r.style.color = '#fff';

// --- Line 6524 ---
r.style.fontFamily = 'inherit';

// --- Line 6525 ---


// --- Line 6526 ---
// 1. Title Input

// --- Line 6527 ---
const titleRow = el('div');

// --- Line 6528 ---
titleRow.innerHTML = `<input type="text" id="agendaTitle" name="agendaTitle" 
       placeholder="Adicionar t�tulo" value="${(card.querySelector('.text') ? card.querySelector('.text').textContent 
       : '').replace(/^\?\?\s*/, '').trim()}" style="width: 100%; border: none; border-bottom: 2px solid rgba(255, 
       255, 255, 0.15); background: transparent; color: #fff; font-size: 18px; font-weight: 500; padding: 6px 0; 
       outline: none; transition: border-color 0.2s;" />`;

// --- Line 6529 ---
const titleInput = titleRow.querySelector('#agendaTitle');

// --- Line 6530 ---
titleInput.addEventListener('focus', () => titleInput.style.borderBottomColor = 
       'var(--brand)');

// --- Line 6531 ---
titleInput.addEventListener('blur', () => titleInput.style.borderBottomColor = 'rgba(255, 
       255, 255, 0.15)');

// --- Line 6532 ---
r.appendChild(titleRow);

// --- Line 6533 ---


// --- Line 6534 ---
// 2. Date & Time Row

// --- Line 6535 ---
const dateTimeRow = el('div');

// --- Line 6536 ---
dateTimeRow.style.display = 'flex';

// --- Line 6537 ---
dateTimeRow.style.gap = '10px';

// --- Line 6538 ---
dateTimeRow.style.alignItems = 'center';

// --- Line 6539 ---
dateTimeRow.style.flexWrap = 'wrap';

// --- Line 6540 ---


// --- Line 6541 ---
const datePicker = el('input');

// --- Line 6542 ---
datePicker.type = 'date';

// --- Line 6543 ---
datePicker.id = 'agendaDateVal';

// --- Line 6544 ---
datePicker.name = 'agendaDateVal';

// --- Line 6545 ---
datePicker.value = cardDate;

// --- Line 6546 ---
datePicker.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6547 ---
datePicker.style.background = 'var(--bg)';

// --- Line 6548 ---
datePicker.style.color = '#fff';

// --- Line 6549 ---
datePicker.style.padding = '6px 8px';

// --- Line 6550 ---
datePicker.style.borderRadius = '6px';

// --- Line 6551 ---
datePicker.style.fontSize = '14px';

// --- Line 6552 ---
datePicker.style.cursor = 'pointer';

// --- Line 6553 ---


// --- Line 6554 ---
const timePicker = el('input');

// --- Line 6555 ---
timePicker.type = 'text';

// --- Line 6556 ---
timePicker.id = 'agendaTimeVal';

// --- Line 6557 ---
timePicker.name = 'agendaTimeVal';

// --- Line 6558 ---
timePicker.value = cardTime;

// --- Line 6559 ---
timePicker.readOnly = true;

// --- Line 6560 ---
timePicker.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6561 ---
timePicker.style.background = 'var(--bg)';

// --- Line 6562 ---
timePicker.style.color = '#fff';

// --- Line 6563 ---
timePicker.style.padding = '6px 8px';

// --- Line 6564 ---
timePicker.style.borderRadius = '6px';

// --- Line 6565 ---
timePicker.style.fontSize = '14px';

// --- Line 6566 ---
timePicker.style.cursor = 'pointer';

// --- Line 6567 ---
timePicker.style.textAlign = 'center';

// --- Line 6568 ---
timePicker.onclick = function () {

// --- Line 6569 ---
openAnalogTimePicker(timePicker.value, function (selectedTime) {

// --- Line 6570 ---
timePicker.value = selectedTime;

// --- Line 6571 ---
});

// --- Line 6572 ---
};

// --- Line 6573 ---
if (isAllDay) {

// --- Line 6574 ---
timePicker.style.display = 'none';

// --- Line 6575 ---
}

// --- Line 6576 ---


// --- Line 6577 ---
const allDayLabel = el('label');

// --- Line 6578 ---
allDayLabel.style.display = 'flex';

// --- Line 6579 ---
allDayLabel.style.alignItems = 'center';

// --- Line 6580 ---
allDayLabel.style.gap = '4px';

// --- Line 6581 ---
allDayLabel.style.fontSize = '13px';

// --- Line 6582 ---
allDayLabel.style.color = '#9fb3d2';

// --- Line 6583 ---
allDayLabel.style.cursor = 'pointer';

// --- Line 6584 ---
allDayLabel.innerHTML = `<input type="checkbox" id="agendaAllDay" name="agendaAllDay" 
       ${isAllDay ? 'checked' : ''} /> Dia inteiro`;

// --- Line 6585 ---
const allDayCheckbox = allDayLabel.querySelector('#agendaAllDay');

// --- Line 6586 ---


// --- Line 6587 ---
const goalLabel = el('label');

// --- Line 6588 ---
goalLabel.style.display = 'flex';

// --- Line 6589 ---
goalLabel.style.alignItems = 'center';

// --- Line 6590 ---
goalLabel.style.gap = '4px';

// --- Line 6591 ---
goalLabel.style.fontSize = '13px';

// --- Line 6592 ---
goalLabel.style.color = '#9fb3d2';

// --- Line 6593 ---
goalLabel.style.cursor = 'pointer';

// --- Line 6594 ---
goalLabel.innerHTML = `<input type="checkbox" id="agendaGoal" name="agendaGoal" ${isGoal ? 
       'checked' : ''} /> Meta do dia`;

// --- Line 6595 ---
const goalCheckbox = goalLabel.querySelector('#agendaGoal');

// --- Line 6596 ---


// --- Line 6597 ---
allDayCheckbox.addEventListener('change', function () {

// --- Line 6598 ---
if (allDayCheckbox.checked) {

// --- Line 6599 ---
timePicker.style.display = 'none';

// --- Line 6600 ---
durationSelect.style.display = 'none';

// --- Line 6601 ---
durationLabel.style.display = 'none';

// --- Line 6602 ---
} else {

// --- Line 6603 ---
timePicker.style.display = '';

// --- Line 6604 ---
durationSelect.style.display = '';

// --- Line 6605 ---
durationLabel.style.display = '';

// --- Line 6606 ---
goalCheckbox.checked = false;

// --- Line 6607 ---
}

// --- Line 6608 ---
});

// --- Line 6609 ---


// --- Line 6610 ---
goalCheckbox.addEventListener('change', function () {

// --- Line 6611 ---
if (goalCheckbox.checked) {

// --- Line 6612 ---
allDayCheckbox.checked = true;

// --- Line 6613 ---
timePicker.style.display = 'none';

// --- Line 6614 ---
durationSelect.style.display = 'none';

// --- Line 6615 ---
durationLabel.style.display = 'none';

// --- Line 6616 ---
}

// --- Line 6617 ---
});

// --- Line 6618 ---


// --- Line 6619 ---
dateTimeRow.appendChild(datePicker);

// --- Line 6620 ---
dateTimeRow.appendChild(timePicker);

// --- Line 6621 ---
dateTimeRow.appendChild(allDayLabel);

// --- Line 6622 ---
dateTimeRow.appendChild(goalLabel);

// --- Line 6623 ---
r.appendChild(dateTimeRow);

// --- Line 6624 ---


// --- Line 6625 ---
// 3. Duration & Recurrence Row

// --- Line 6626 ---
const durRecRow = el('div');

// --- Line 6627 ---
durRecRow.style.display = 'flex';

// --- Line 6628 ---
durRecRow.style.gap = '10px';

// --- Line 6629 ---
durRecRow.style.alignItems = 'center';

// --- Line 6630 ---
durRecRow.style.flexWrap = 'wrap';

// --- Line 6631 ---


// --- Line 6632 ---
const durationLabel = el('span');

// --- Line 6633 ---
durationLabel.textContent = 'Dura��o:';

// --- Line 6634 ---
durationLabel.style.fontSize = '13px';

// --- Line 6635 ---
durationLabel.style.color = '#9fb3d2';

// --- Line 6636 ---
if (isAllDay) durationLabel.style.display = 'none';

// --- Line 6637 ---


// --- Line 6638 ---
const durationSelect = el('select');

// --- Line 6639 ---
durationSelect.id = 'agendaDuration';

// --- Line 6640 ---
durationSelect.name = 'agendaDuration';

// --- Line 6641 ---
durationSelect.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6642 ---
durationSelect.style.background = 'var(--bg)';

// --- Line 6643 ---
durationSelect.style.color = '#fff';

// --- Line 6644 ---
durationSelect.style.padding = '6px 8px';

// --- Line 6645 ---
durationSelect.style.borderRadius = '6px';

// --- Line 6646 ---
durationSelect.style.fontSize = '14px';

// --- Line 6647 ---
durationSelect.style.cursor = 'pointer';

// --- Line 6648 ---
if (isAllDay) durationSelect.style.display = 'none';

// --- Line 6649 ---


// --- Line 6650 ---
const durations = [

// --- Line 6651 ---
{ val: '15', text: '15 min' },

// --- Line 6652 ---
{ val: '30', text: '30 min' },

// --- Line 6653 ---
{ val: '60', text: '1 hora' },

// --- Line 6654 ---
{ val: '120', text: '2 horas' },

// --- Line 6655 ---
{ val: '180', text: '3 horas' },

// --- Line 6656 ---
{ val: 'custom', text: 'Personalizado...' }

// --- Line 6657 ---
];

// --- Line 6658 ---
durations.forEach(d => {

// --- Line 6659 ---
const opt = el('option');

// --- Line 6660 ---
opt.value = d.val;

// --- Line 6661 ---
opt.textContent = d.text;

// --- Line 6662 ---
durationSelect.appendChild(opt);

// --- Line 6663 ---
});

// --- Line 6664 ---


// --- Line 6665 ---
const customDurationInput = el('input');

// --- Line 6666 ---
customDurationInput.type = 'number';

// --- Line 6667 ---
customDurationInput.id = 'agendaCustomDuration';

// --- Line 6668 ---
customDurationInput.name = 'agendaCustomDuration';

// --- Line 6669 ---
customDurationInput.placeholder = 'Minutos';

// --- Line 6670 ---
customDurationInput.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6671 ---
customDurationInput.style.background = 'var(--bg)';

// --- Line 6672 ---
customDurationInput.style.color = '#fff';

// --- Line 6673 ---
customDurationInput.style.padding = '6px 8px';

// --- Line 6674 ---
customDurationInput.style.borderRadius = '6px';

// --- Line 6675 ---
customDurationInput.style.fontSize = '14px';

// --- Line 6676 ---
customDurationInput.style.width = '80px';

// --- Line 6677 ---
customDurationInput.style.display = 'none';

// --- Line 6678 ---


// --- Line 6679 ---
if (['15', '30', '60', '120', '180'].includes(currentDuration)) {

// --- Line 6680 ---
durationSelect.value = currentDuration;

// --- Line 6681 ---
} else if (currentDuration) {

// --- Line 6682 ---
durationSelect.value = 'custom';

// --- Line 6683 ---
customDurationInput.value = currentDuration;

// --- Line 6684 ---
customDurationInput.style.display = '';

// --- Line 6685 ---
} else {

// --- Line 6686 ---
durationSelect.value = '60';

// --- Line 6687 ---
}

// --- Line 6688 ---


// --- Line 6689 ---
durationSelect.addEventListener('change', function () {

// --- Line 6690 ---
if (durationSelect.value === 'custom') {

// --- Line 6691 ---
customDurationInput.style.display = '';

// --- Line 6692 ---
} else {

// --- Line 6693 ---
customDurationInput.style.display = 'none';

// --- Line 6694 ---
}

// --- Line 6695 ---
});

// --- Line 6696 ---


// --- Line 6697 ---
const recLabel = el('span');

// --- Line 6698 ---
recLabel.textContent = 'Repetir:';

// --- Line 6699 ---
recLabel.style.fontSize = '13px';

// --- Line 6700 ---
recLabel.style.color = '#9fb3d2';

// --- Line 6701 ---


// --- Line 6702 ---
const recurrenceSelect = el('select');

// --- Line 6703 ---
recurrenceSelect.id = 'agendaRecurrence';

// --- Line 6704 ---
recurrenceSelect.name = 'agendaRecurrence';

// --- Line 6705 ---
recurrenceSelect.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6706 ---
recurrenceSelect.style.background = 'var(--bg)';

// --- Line 6707 ---
recurrenceSelect.style.color = '#fff';

// --- Line 6708 ---
recurrenceSelect.style.padding = '6px 8px';

// --- Line 6709 ---
recurrenceSelect.style.borderRadius = '6px';

// --- Line 6710 ---
recurrenceSelect.style.fontSize = '14px';

// --- Line 6711 ---
recurrenceSelect.style.cursor = 'pointer';

// --- Line 6712 ---


// --- Line 6713 ---
const recOptions = [

// --- Line 6714 ---
{ val: 'none', text: 'N�o se repete' },

// --- Line 6715 ---
{ val: 'daily', text: 'Todos os dias' },

// --- Line 6716 ---
{ val: 'weekdays', text: 'Dias da semana (segunda a sexta)' },

// --- Line 6717 ---
{ val: 'weekly', text: 'Semanalmente' },

// --- Line 6718 ---
{ val: 'monthly', text: 'Mensalmente' },

// --- Line 6719 ---
{ val: 'custom', text: 'Personalizado...' }

// --- Line 6720 ---
];

// --- Line 6721 ---
recOptions.forEach(o => {

// --- Line 6722 ---
const opt = el('option');

// --- Line 6723 ---
opt.value = o.val;

// --- Line 6724 ---
opt.textContent = o.text;

// --- Line 6725 ---
recurrenceSelect.appendChild(opt);

// --- Line 6726 ---
});

// --- Line 6727 ---


// --- Line 6728 ---
if (isCustomRecurrence) {

// --- Line 6729 ---
recurrenceSelect.value = 'custom';

// --- Line 6730 ---
} else {

// --- Line 6731 ---
recurrenceSelect.value = currentRecurrence;

// --- Line 6732 ---
}

// --- Line 6733 ---


// --- Line 6734 ---
const recEditBtn = el('button');

// --- Line 6735 ---
recEditBtn.type = 'button';

// --- Line 6736 ---
recEditBtn.textContent = '?? Editar';

// --- Line 6737 ---
recEditBtn.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6738 ---
recEditBtn.style.background = 'var(--bg)';

// --- Line 6739 ---
recEditBtn.style.color = '#fff';

// --- Line 6740 ---
recEditBtn.style.padding = '6px 8px';

// --- Line 6741 ---
recEditBtn.style.borderRadius = '6px';

// --- Line 6742 ---
recEditBtn.style.fontSize = '14px';

// --- Line 6743 ---
recEditBtn.style.cursor = 'pointer';

// --- Line 6744 ---
recEditBtn.style.display = isCustomRecurrence ? 'inline-block' : 'none';

// --- Line 6745 ---


// --- Line 6746 ---
recurrenceSelect.addEventListener('change', function () {

// --- Line 6747 ---
if (recurrenceSelect.value === 'custom') {

// --- Line 6748 ---
openCustomRecurrenceDialog(tempRecurrenceValue.startsWith('{') ? 
       tempRecurrenceValue : null, function(savedRule) {

// --- Line 6749 ---
tempRecurrenceValue = JSON.stringify(savedRule);

// --- Line 6750 ---
recEditBtn.style.display = 'inline-block';

// --- Line 6751 ---
}, function() {

// --- Line 6752 ---
if (tempRecurrenceValue.startsWith('{')) {

// --- Line 6753 ---
recurrenceSelect.value = 'custom';

// --- Line 6754 ---
recEditBtn.style.display = 'inline-block';

// --- Line 6755 ---
} else {

// --- Line 6756 ---
recurrenceSelect.value = tempRecurrenceValue;

// --- Line 6757 ---
recEditBtn.style.display = 'none';

// --- Line 6758 ---
}

// --- Line 6759 ---
});

// --- Line 6760 ---
} else {

// --- Line 6761 ---
tempRecurrenceValue = recurrenceSelect.value;

// --- Line 6762 ---
recEditBtn.style.display = 'none';

// --- Line 6763 ---
}

// --- Line 6764 ---
});

// --- Line 6765 ---


// --- Line 6766 ---
recEditBtn.onclick = function(e) {

// --- Line 6767 ---
e.preventDefault();

// --- Line 6768 ---
openCustomRecurrenceDialog(tempRecurrenceValue.startsWith('{') ? tempRecurrenceValue : 
       null, function(savedRule) {

// --- Line 6769 ---
tempRecurrenceValue = JSON.stringify(savedRule);

// --- Line 6770 ---
});

// --- Line 6771 ---
};

// --- Line 6772 ---


// --- Line 6773 ---
durRecRow.appendChild(durationLabel);

// --- Line 6774 ---
durRecRow.appendChild(durationSelect);

// --- Line 6775 ---
durRecRow.appendChild(customDurationInput);

// --- Line 6776 ---
durRecRow.appendChild(recLabel);

// --- Line 6777 ---
durRecRow.appendChild(recurrenceSelect);

// --- Line 6778 ---
durRecRow.appendChild(recEditBtn);

// --- Line 6779 ---
r.appendChild(durRecRow);

// --- Line 6780 ---


// --- Line 6781 ---
// 4. Alert Row (Modern UX)

// --- Line 6782 ---
const alertRow = el('div');

// --- Line 6783 ---
alertRow.id = 'agendaAlertRow';

// --- Line 6784 ---
alertRow.style.display = 'flex';

// --- Line 6785 ---
alertRow.style.alignItems = 'center';

// --- Line 6786 ---
alertRow.style.justifyContent = 'space-between';

// --- Line 6787 ---
alertRow.style.padding = '10px 12px';

// --- Line 6788 ---
alertRow.style.background = 'var(--bg)';

// --- Line 6789 ---
alertRow.style.border = '1px solid rgba(255, 255, 255, 0.15)';

// --- Line 6790 ---
alertRow.style.borderRadius = '8px';

// --- Line 6791 ---
alertRow.style.cursor = 'pointer';

// --- Line 6792 ---
alertRow.style.marginTop = '6px';

// --- Line 6793 ---
alertRow.style.transition = 'background 0.2s';

// --- Line 6794 ---
alertRow.onmouseover = () => alertRow.style.background = 'color-mix(in srgb, var(--brand) 
       10%, var(--panel))';

// --- Line 6795 ---
alertRow.onmouseout = () => alertRow.style.background = 'var(--bg)';

// --- Line 6796 ---


// --- Line 6797 ---
function updateAlertRowSummary() {

// --- Line 6798 ---
const summaryEl = alertRow.querySelector('#agendaAlertSummary');

// --- Line 6799 ---
if (summaryEl) {

// --- Line 6800 ---
if (tempAlertEnabled) {

// --- Line 6801 ---
if (tempAlertValue === 0) {

// --- Line 6802 ---
summaryEl.textContent = 'No hor�rio do evento';

// --- Line 6803 ---
} else {

// --- Line 6804 ---
summaryEl.textContent = `${tempAlertValue} ${tempAlertUnit} antes`;

// --- Line 6805 ---
}

// --- Line 6806 ---
} else {

// --- Line 6807 ---
summaryEl.textContent = 'Desativado';

// --- Line 6808 ---
}

// --- Line 6809 ---
}

// --- Line 6810 ---
}

// --- Line 6811 ---


// --- Line 6812 ---
alertRow.innerHTML = `

// --- Line 6813 ---
<div style="display: flex; align-items: center; gap: 10px;">

// --- Line 6814 ---
<span style="font-size: 18px;">??</span>

// --- Line 6815 ---
<div style="display: flex; flex-direction: column; text-align: left;">

// --- Line 6816 ---
<span style="font-size: 13px; font-weight: bold; color: #fff;">Alerta / 
       Notifica��o</span>

// --- Line 6817 ---
<span id="agendaAlertSummary" style="font-size: 12px; color: 
       #9fb3d2;">Desativado</span>

// --- Line 6818 ---
</div>

// --- Line 6819 ---
</div>

// --- Line 6820 ---
<span style="font-size: 14px; color: #9fb3d2;">?</span>

// --- Line 6821 ---
`;

// --- Line 6822 ---


// --- Line 6823 ---
alertRow.onclick = function() {

// --- Line 6824 ---
openAlertDialog({

// --- Line 6825 ---
alertEnabled: tempAlertEnabled ? 'true' : 'false',

// --- Line 6826 ---
alertValue: tempAlertValue,

// --- Line 6827 ---
alertUnit: tempAlertUnit

// --- Line 6828 ---
}, function(saved) {

// --- Line 6829 ---
tempAlertEnabled = saved.alertEnabled;

// --- Line 6830 ---
tempAlertValue = saved.alertValue;

// --- Line 6831 ---
tempAlertUnit = saved.alertUnit;

// --- Line 6832 ---
updateAlertRowSummary();

// --- Line 6833 ---
});

// --- Line 6834 ---
};

// --- Line 6835 ---


// --- Line 6836 ---
r.appendChild(alertRow);

// --- Line 6837 ---
setTimeout(updateAlertRowSummary, 0);

// --- Line 6838 ---


// --- Line 6839 ---
// 5. Description Textarea

// --- Line 6840 ---
const descRow = el('div');

// --- Line 6841 ---
descRow.innerHTML = `<textarea id="agendaDescription" name="agendaDescription" 
       placeholder="Adicionar descri��o..." style="width: 100%; min-height: 80px; border: 1px solid rgba(255, 255, 
       255, 0.15); background: var(--bg); color: #fff; border-radius: 6px; padding: 8px; font-size: 14px; resize: 
       vertical; outline: none; font-family: inherit;"></textarea>`;

// --- Line 6842 ---
const descTextarea = descRow.querySelector('#agendaDescription');

// --- Line 6843 ---
descTextarea.value = currentDescription;

// --- Line 6844 ---
descTextarea.addEventListener('focus', () => descTextarea.style.borderColor = 
       'var(--brand)');

// --- Line 6845 ---
descTextarea.addEventListener('blur', () => descTextarea.style.borderColor = 'rgba(255, 
       255, 255, 0.15)');

// --- Line 6846 ---
r.appendChild(descRow);

// --- Line 6847 ---


// --- Line 6848 ---
return r;

// --- Line 6849 ---
}, function (body, wrap) {

// --- Line 6850 ---
const titleVal = body.querySelector('#agendaTitle').value.trim();

// --- Line 6851 ---
const dateVal = body.querySelector('#agendaDateVal').value;

// --- Line 6852 ---
const timeVal = body.querySelector('#agendaTimeVal').value;

// --- Line 6853 ---
const isAllDayChecked = body.querySelector('#agendaAllDay').checked;

// --- Line 6854 ---
const isGoalChecked = body.querySelector('#agendaGoal').checked;

// --- Line 6855 ---
const recVal = body.querySelector('#agendaRecurrence').value;

// --- Line 6856 ---
const descVal = body.querySelector('#agendaDescription').value.trim();

// --- Line 6857 ---


// --- Line 6858 ---
const durSelVal = body.querySelector('#agendaDuration').value;

// --- Line 6859 ---
let durVal = durSelVal;

// --- Line 6860 ---
if (durSelVal === 'custom') {

// --- Line 6861 ---
durVal = body.querySelector('#agendaCustomDuration').value.trim();

// --- Line 6862 ---
}

// --- Line 6863 ---


// --- Line 6864 ---
// Recurrence save string

// --- Line 6865 ---
let recurrenceSaveValue = recVal;

// --- Line 6866 ---
if (recVal === 'custom') {

// --- Line 6867 ---
recurrenceSaveValue = tempRecurrenceValue;

// --- Line 6868 ---
}

// --- Line 6869 ---


// --- Line 6870 ---
const targetCard = card._originalReference || card;

// --- Line 6871 ---
const txtSpan = targetCard.querySelector('.text');

// --- Line 6872 ---
if (txtSpan) {

// --- Line 6873 ---
txtSpan.textContent = (isGoalChecked ? '?? ' : '') + titleVal;

// --- Line 6874 ---
}

// --- Line 6875 ---


// --- Line 6876 ---
targetCard.dataset.description = descVal;

// --- Line 6877 ---
targetCard.dataset.duration = isAllDayChecked ? '' : durVal;

// --- Line 6878 ---
targetCard.dataset.recurrence = recurrenceSaveValue;

// --- Line 6879 ---


// --- Line 6880 ---
targetCard.dataset.alertEnabled = tempAlertEnabled ? 'true' : 'false';

// --- Line 6881 ---
targetCard.dataset.alertValue = tempAlertValue;

// --- Line 6882 ---
targetCard.dataset.alertUnit = tempAlertUnit;

// --- Line 6883 ---
targetCard.dataset.alertFired = 'false'; // Reset fired status on change

// --- Line 6884 ---


// --- Line 6885 ---
if (isGoalChecked) {

// --- Line 6886 ---
targetCard.dataset.when = dateVal + 'TGOAL';

// --- Line 6887 ---
} else if (isAllDayChecked) {

// --- Line 6888 ---
targetCard.dataset.when = dateVal + 'T';

// --- Line 6889 ---
} else {

// --- Line 6890 ---
targetCard.dataset.when = dateVal + 'T' + timeVal;

// --- Line 6891 ---
}

// --- Line 6892 ---


// --- Line 6893 ---
targetCard.dataset.recurrenceParent = '';

// --- Line 6894 ---


// --- Line 6895 ---
paintCard(targetCard);

// --- Line 6896 ---
generateRecurrences(targetCard);

// --- Line 6897 ---
applyFilters();

// --- Line 6898 ---
updateSlotsHasItems();

// --- Line 6899 ---
});

// --- Line 6900 ---
}

// --- Line 6901 ---
function openTimerDialog(cards, onOkCallback) {

// --- Line 6902 ---
if (!cards.length) return;

// --- Line 6903 ---
var modalElements = showModal('Definir Timer (minutos)', function () {

// --- Line 6904 ---
var r = el('div');

// --- Line 6905 ---
var timerVal = Math.round(parseInt(cards[0].dataset.timerTotal || '0', 10) / 60) || '';

// --- Line 6906 ---
r.innerHTML = `<label style="display: block;">Tempo para o timer (em minutos):<input 
       type="number" id="timerInputValue" name="timerInputValue" class="timer-input" placeholder="Ex: 25" 
       value="${timerVal}" style="width:100%; padding:8px; background:var(--bg); border:1px solid rgba(255, 255, 255, 
       0.15); border-radius:8px; color:#fff; margin-top: 4px;"></label>`;

// --- Line 6907 ---
const input = r.querySelector('.timer-input'); if (input) { 
       input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); 
       modalElements.okButton.click(); } }); }

// --- Line 6908 ---
return r;

// --- Line 6909 ---
}, function (r, wrap) {

// --- Line 6910 ---
var timerMins = r.querySelector('.timer-input').value;

// --- Line 6911 ---
cards.forEach(function (c) {

// --- Line 6912 ---
var newTotal = (parseInt(timerMins, 10) || 0) * 60;

// --- Line 6913 ---
c.dataset.timerTotal = newTotal; c.dataset.timerLeft = newTotal; c.dataset.timerState = 
       'stopped';

// --- Line 6914 ---
c.style.animation = ''; c.classList.remove('timer-running', 'timer-finished'); 
       paintCard(c);

// --- Line 6915 ---
});

// --- Line 6916 ---
applyFilters(); updateTotalTimerDisplay(); if (onOkCallback) onOkCallback();

// --- Line 6917 ---
});

// --- Line 6918 ---
modalElements.cancelButton.onclick = function () { 
       modalElements.wrap.removeEventListener('keydown', modalElements.modalKeyListener); 
       document.body.removeChild(modalElements.wrap); persist(); }

// --- Line 6919 ---
}

// --- Line 6920 ---
function openAnalogTimePicker(initialTime, onSelect) {

// --- Line 6921 ---
// Parse initialTime (format "HH:MM")

// --- Line 6922 ---
let parts = (initialTime || "09:00").split(":");

// --- Line 6923 ---
let currentHour = parseInt(parts[0], 10);

// --- Line 6924 ---
let currentMinute = parseInt(parts[1], 10);

// --- Line 6925 ---
if (isNaN(currentHour) || currentHour < 0 || currentHour > 23) currentHour = 9;

// --- Line 6926 ---
if (isNaN(currentMinute) || currentMinute < 0 || currentMinute > 59) currentMinute = 0;

// --- Line 6927 ---


// --- Line 6928 ---
// State

// --- Line 6929 ---
let activeMode = 'hour'; // 'hour' or 'minute'

// --- Line 6930 ---
let inputMode = 'analog'; // 'analog' or 'keyboard'

// --- Line 6931 ---


// --- Line 6932 ---
// Create backdrop

// --- Line 6933 ---
const backdrop = el('div', 'analog-time-picker-backdrop');

// --- Line 6934 ---
const modal = el('div', 'analog-time-picker-modal');

// --- Line 6935 ---


// --- Line 6936 ---
const title = el('div', 'analog-time-picker-title');

// --- Line 6937 ---
title.textContent = 'Selecionar hor�rio';

// --- Line 6938 ---
modal.appendChild(title);

// --- Line 6939 ---


// --- Line 6940 ---
// Digital display

// --- Line 6941 ---
const displayRow = el('div', 'analog-time-picker-display');

// --- Line 6942 ---


// --- Line 6943 ---
const hourInput = el('input');

// --- Line 6944 ---
hourInput.type = 'text';

// --- Line 6945 ---
hourInput.id = 'analog-hour-input';

// --- Line 6946 ---
hourInput.value = to2(currentHour);

// --- Line 6947 ---
hourInput.readOnly = true;

// --- Line 6948 ---
hourInput.maxLength = 2;

// --- Line 6949 ---
hourInput.pattern = '[0-9]*';

// --- Line 6950 ---
hourInput.inputMode = 'numeric';

// --- Line 6951 ---
hourInput.classList.add('active');

// --- Line 6952 ---


// --- Line 6953 ---
const colon = el('span');

// --- Line 6954 ---
colon.textContent = ':';

// --- Line 6955 ---


// --- Line 6956 ---
const minuteInput = el('input');

// --- Line 6957 ---
minuteInput.type = 'text';

// --- Line 6958 ---
minuteInput.id = 'analog-minute-input';

// --- Line 6959 ---
minuteInput.value = to2(currentMinute);

// --- Line 6960 ---
minuteInput.readOnly = true;

// --- Line 6961 ---
minuteInput.maxLength = 2;

// --- Line 6962 ---
minuteInput.pattern = '[0-9]*';

// --- Line 6963 ---
minuteInput.inputMode = 'numeric';

// --- Line 6964 ---


// --- Line 6965 ---
displayRow.appendChild(hourInput);

// --- Line 6966 ---
displayRow.appendChild(colon);

// --- Line 6967 ---
displayRow.appendChild(minuteInput);

// --- Line 6968 ---
modal.appendChild(displayRow);

// --- Line 6969 ---


// --- Line 6970 ---
// Face Container

// --- Line 6971 ---
const faceContainer = el('div', 'analog-time-picker-face-container');

// --- Line 6972 ---
modal.appendChild(faceContainer);

// --- Line 6973 ---


// --- Line 6974 ---
// Keyboard input help message (hidden by default)

// --- Line 6975 ---
const keyboardMsg = el('div', 'analog-time-picker-keyboard-input-msg');

// --- Line 6976 ---
keyboardMsg.textContent = 'Digite o hor�rio desejado nos campos acima.';

// --- Line 6977 ---
keyboardMsg.style.display = 'none';

// --- Line 6978 ---
modal.appendChild(keyboardMsg);

// --- Line 6979 ---


// --- Line 6980 ---
// SVG for needle drawing

// --- Line 6981 ---
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

// --- Line 6982 ---
svg.setAttribute("class", "analog-time-picker-svg");

// --- Line 6983 ---
faceContainer.appendChild(svg);

// --- Line 6984 ---


// --- Line 6985 ---
// Helper to update SVGNeedle

// --- Line 6986 ---
function updateNeedle(value) {

// --- Line 6987 ---
// Clear existing elements in SVG

// --- Line 6988 ---
svg.innerHTML = '';

// --- Line 6989 ---


// --- Line 6990 ---
let R = 92; // Default outer radius

// --- Line 6991 ---
let angleStep = 30; // 360 / 12

// --- Line 6992 ---


// --- Line 6993 ---
if (activeMode === 'hour') {

// --- Line 6994 ---
R = value < 12 ? 92 : 62;

// --- Line 6995 ---
angleStep = 30;

// --- Line 6996 ---
} else {

// --- Line 6997 ---
R = 92;

// --- Line 6998 ---
angleStep = 6; // 360 / 60

// --- Line 6999 ---
}

// --- Line 7000 ---


// --- Line 7001 ---
const angleDeg = (value * angleStep) - 90;

// --- Line 7002 ---
const angleRad = angleDeg * Math.PI / 180;

// --- Line 7003 ---
const centerX = 115;

// --- Line 7004 ---
const centerY = 115;

// --- Line 7005 ---
const targetX = centerX + R * Math.cos(angleRad);

// --- Line 7006 ---
const targetY = centerY + R * Math.sin(angleRad);

// --- Line 7007 ---


// --- Line 7008 ---
// Create line

// --- Line 7009 ---
const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

// --- Line 7010 ---
line.setAttribute("x1", centerX);

// --- Line 7011 ---
line.setAttribute("y1", centerY);

// --- Line 7012 ---
line.setAttribute("x2", targetX);

// --- Line 7013 ---
line.setAttribute("y2", targetY);

// --- Line 7014 ---
line.setAttribute("stroke", "var(--brand)");

// --- Line 7015 ---
line.setAttribute("stroke-width", "2");

// --- Line 7016 ---
svg.appendChild(line);

// --- Line 7017 ---


// --- Line 7018 ---
// Center pivot circle

// --- Line 7019 ---
const pivot = document.createElementNS("http://www.w3.org/2000/svg", "circle");

// --- Line 7020 ---
pivot.setAttribute("cx", centerX);

// --- Line 7021 ---
pivot.setAttribute("cy", centerY);

// --- Line 7022 ---
pivot.setAttribute("r", "4");

// --- Line 7023 ---
pivot.setAttribute("fill", "var(--brand)");

// --- Line 7024 ---
svg.appendChild(pivot);

// --- Line 7025 ---


// --- Line 7026 ---
// End selection circle

// --- Line 7027 ---
const targetCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

// --- Line 7028 ---
targetCircle.setAttribute("cx", targetX);

// --- Line 7029 ---
targetCircle.setAttribute("cy", targetY);

// --- Line 7030 ---
targetCircle.setAttribute("r", "16");

// --- Line 7031 ---
targetCircle.setAttribute("fill", "var(--brand)");

// --- Line 7032 ---
targetCircle.setAttribute("opacity", "0.85");

// --- Line 7033 ---
svg.appendChild(targetCircle);

// --- Line 7034 ---


// --- Line 7035 ---
// Small center dot in target circle

// --- Line 7036 ---
const targetCenter = document.createElementNS("http://www.w3.org/2000/svg", "circle");

// --- Line 7037 ---
targetCenter.setAttribute("cx", targetX);

// --- Line 7038 ---
targetCenter.setAttribute("cy", targetY);

// --- Line 7039 ---
targetCenter.setAttribute("r", "3");

// --- Line 7040 ---
targetCenter.setAttribute("fill", "#fff");

// --- Line 7041 ---
svg.appendChild(targetCenter);

// --- Line 7042 ---


// --- Line 7043 ---
// Highlight selected number HTML element

// --- Line 7044 ---
faceContainer.querySelectorAll('.analog-time-picker-number').forEach(numEl => {

// --- Line 7045 ---
const val = parseInt(numEl.dataset.value, 10);

// --- Line 7046 ---
if (val === value) {

// --- Line 7047 ---
numEl.classList.add('selected');

// --- Line 7048 ---
} else {

// --- Line 7049 ---
numEl.classList.remove('selected');

// --- Line 7050 ---
}

// --- Line 7051 ---
});

// --- Line 7052 ---
}

// --- Line 7053 ---


// --- Line 7054 ---
// Render Clock Face Numbers

// --- Line 7055 ---
function renderFace() {

// --- Line 7056 ---
// Remove existing HTML numbers (keep SVG)

// --- Line 7057 ---
faceContainer.querySelectorAll('.analog-time-picker-number').forEach(el => el.remove());

// --- Line 7058 ---


// --- Line 7059 ---
const centerX = 115;

// --- Line 7060 ---
const centerY = 115;

// --- Line 7061 ---


// --- Line 7062 ---
if (activeMode === 'hour') {

// --- Line 7063 ---
// Outer circle (0-11)

// --- Line 7064 ---
for (let h = 0; h < 12; h++) {

// --- Line 7065 ---
const numEl = el('div', 'analog-time-picker-number');

// --- Line 7066 ---
numEl.textContent = h === 0 ? '0' : h.toString();

// --- Line 7067 ---
numEl.dataset.value = h;

// --- Line 7068 ---
const angle = (h * 30 - 90) * Math.PI / 180;

// --- Line 7069 ---
const x = centerX + 92 * Math.cos(angle) - 14;

// --- Line 7070 ---
const y = centerY + 92 * Math.sin(angle) - 14;

// --- Line 7071 ---
numEl.style.left = x + 'px';

// --- Line 7072 ---
numEl.style.top = y + 'px';

// --- Line 7073 ---
faceContainer.appendChild(numEl);

// --- Line 7074 ---
}

// --- Line 7075 ---
// Inner circle (12-23)

// --- Line 7076 ---
for (let h = 12; h < 24; h++) {

// --- Line 7077 ---
const numEl = el('div', 'analog-time-picker-number');

// --- Line 7078 ---
numEl.textContent = h.toString();

// --- Line 7079 ---
numEl.dataset.value = h;

// --- Line 7080 ---
const angle = ((h - 12) * 30 - 90) * Math.PI / 180;

// --- Line 7081 ---
const x = centerX + 62 * Math.cos(angle) - 14;

// --- Line 7082 ---
const y = centerY + 62 * Math.sin(angle) - 14;

// --- Line 7083 ---
numEl.style.left = x + 'px';

// --- Line 7084 ---
numEl.style.top = y + 'px';

// --- Line 7085 ---
faceContainer.appendChild(numEl);

// --- Line 7086 ---
}

// --- Line 7087 ---
updateNeedle(currentHour);

// --- Line 7088 ---
} else {

// --- Line 7089 ---
// Minutes (0-55, step 5)

// --- Line 7090 ---
for (let m = 0; m < 60; m += 5) {

// --- Line 7091 ---
const numEl = el('div', 'analog-time-picker-number');

// --- Line 7092 ---
numEl.textContent = m === 0 ? '0' : to2(m);

// --- Line 7093 ---
numEl.dataset.value = m;

// --- Line 7094 ---
const angle = ((m / 5) * 30 - 90) * Math.PI / 180;

// --- Line 7095 ---
const x = centerX + 92 * Math.cos(angle) - 14;

// --- Line 7096 ---
const y = centerY + 92 * Math.sin(angle) - 14;

// --- Line 7097 ---
numEl.style.left = x + 'px';

// --- Line 7098 ---
numEl.style.top = y + 'px';

// --- Line 7099 ---
faceContainer.appendChild(numEl);

// --- Line 7100 ---
}

// --- Line 7101 ---
updateNeedle(currentMinute);

// --- Line 7102 ---
}

// --- Line 7103 ---
}

// --- Line 7104 ---


// --- Line 7105 ---
// Interactive selection handler from click/touch coordinates

// --- Line 7106 ---
function handlePointer(clientX, clientY, isEnd = false) {

// --- Line 7107 ---
const rect = faceContainer.getBoundingClientRect();

// --- Line 7108 ---
const x = clientX - rect.left - 115;

// --- Line 7109 ---
const y = clientY - rect.top - 115;

// --- Line 7110 ---


// --- Line 7111 ---
let angleRad = Math.atan2(y, x);

// --- Line 7112 ---
let angleDeg = angleRad * 180 / Math.PI + 90;

// --- Line 7113 ---
if (angleDeg < 0) angleDeg += 360;

// --- Line 7114 ---


// --- Line 7115 ---
if (activeMode === 'hour') {

// --- Line 7116 ---
// Determine outer vs inner ring

// --- Line 7117 ---
const dist = Math.sqrt(x*x + y*y);

// --- Line 7118 ---
const isInner = dist < 77; // threshold between 62px and 92px radius (midpoint is 77px)

// --- Line 7119 ---


// --- Line 7120 ---
let hourBase = Math.round(angleDeg / 30) % 12;

// --- Line 7121 ---
let val = isInner ? hourBase + 12 : hourBase;

// --- Line 7122 ---


// --- Line 7123 ---
currentHour = val;

// --- Line 7124 ---
hourInput.value = to2(currentHour);

// --- Line 7125 ---
updateNeedle(currentHour);

// --- Line 7126 ---


// --- Line 7127 ---
if (isEnd) {

// --- Line 7128 ---
// Switch to minutes mode on release

// --- Line 7129 ---
activeMode = 'minute';

// --- Line 7130 ---
hourInput.classList.remove('active');

// --- Line 7131 ---
minuteInput.classList.add('active');

// --- Line 7132 ---
renderFace();

// --- Line 7133 ---
}

// --- Line 7134 ---
} else {

// --- Line 7135 ---
let minVal = Math.round(angleDeg / 6) % 60;

// --- Line 7136 ---
currentMinute = minVal;

// --- Line 7137 ---
minuteInput.value = to2(currentMinute);

// --- Line 7138 ---
updateNeedle(currentMinute);

// --- Line 7139 ---
}

// --- Line 7140 ---
}

// --- Line 7141 ---


// --- Line 7142 ---
// Pointer Events on Face

// --- Line 7143 ---
let isDragging = false;

// --- Line 7144 ---
faceContainer.onpointerdown = (e) => {

// --- Line 7145 ---
e.preventDefault();

// --- Line 7146 ---
isDragging = true;

// --- Line 7147 ---
faceContainer.setPointerCapture(e.pointerId);

// --- Line 7148 ---
handlePointer(e.clientX, e.clientY);

// --- Line 7149 ---
};

// --- Line 7150 ---
faceContainer.onpointermove = (e) => {

// --- Line 7151 ---
if (isDragging) {

// --- Line 7152 ---
e.preventDefault();

// --- Line 7153 ---
handlePointer(e.clientX, e.clientY);

// --- Line 7154 ---
}

// --- Line 7155 ---
};

// --- Line 7156 ---
faceContainer.onpointerup = (e) => {

// --- Line 7157 ---
if (isDragging) {

// --- Line 7158 ---
isDragging = false;

// --- Line 7159 ---
faceContainer.releasePointerCapture(e.pointerId);

// --- Line 7160 ---
handlePointer(e.clientX, e.clientY, true);

// --- Line 7161 ---
}

// --- Line 7162 ---
};

// --- Line 7163 ---


// --- Line 7164 ---
// Click digital displays to toggle modes

// --- Line 7165 ---
hourInput.onclick = () => {

// --- Line 7166 ---
if (inputMode === 'analog') {

// --- Line 7167 ---
activeMode = 'hour';

// --- Line 7168 ---
hourInput.classList.add('active');

// --- Line 7169 ---
minuteInput.classList.remove('active');

// --- Line 7170 ---
renderFace();

// --- Line 7171 ---
}

// --- Line 7172 ---
};

// --- Line 7173 ---
minuteInput.onclick = () => {

// --- Line 7174 ---
if (inputMode === 'analog') {

// --- Line 7175 ---
activeMode = 'minute';

// --- Line 7176 ---
hourInput.classList.remove('active');

// --- Line 7177 ---
minuteInput.classList.add('active');

// --- Line 7178 ---
renderFace();

// --- Line 7179 ---
}

// --- Line 7180 ---
};

// --- Line 7181 ---


// --- Line 7182 ---
// Footer section with Keyboard and OK/Cancel buttons

// --- Line 7183 ---
const footer = el('div', 'analog-time-picker-footer');

// --- Line 7184 ---


// --- Line 7185 ---
const keyboardBtn = el('button', 'analog-time-picker-keyboard-btn');

// --- Line 7186 ---
keyboardBtn.type = 'button';

// --- Line 7187 ---
keyboardBtn.innerHTML = '??'; // Keyboard icon

// --- Line 7188 ---
keyboardBtn.title = 'Digitar hor�rio';

// --- Line 7189 ---
footer.appendChild(keyboardBtn);

// --- Line 7190 ---


// --- Line 7191 ---
const buttonsDiv = el('div', 'analog-time-picker-buttons');

// --- Line 7192 ---


// --- Line 7193 ---
const cancelBtn = el('button');

// --- Line 7194 ---
cancelBtn.type = 'button';

// --- Line 7195 ---
cancelBtn.textContent = 'Cancelar';

// --- Line 7196 ---


// --- Line 7197 ---
const okBtn = el('button');

// --- Line 7198 ---
okBtn.type = 'button';

// --- Line 7199 ---
okBtn.textContent = 'OK';

// --- Line 7200 ---


// --- Line 7201 ---
buttonsDiv.appendChild(cancelBtn);

// --- Line 7202 ---
buttonsDiv.appendChild(okBtn);

// --- Line 7203 ---
footer.appendChild(buttonsDiv);

// --- Line 7204 ---
modal.appendChild(footer);

// --- Line 7205 ---
backdrop.appendChild(modal);

// --- Line 7206 ---
document.body.appendChild(backdrop);

// --- Line 7207 ---


// --- Line 7208 ---
// Initial face render

// --- Line 7209 ---
renderFace();

// --- Line 7210 ---


// --- Line 7211 ---
// Keyboard Toggle Handler

// --- Line 7212 ---
keyboardBtn.onclick = () => {

// --- Line 7213 ---
if (inputMode === 'analog') {

// --- Line 7214 ---
// Switch to keyboard mode

// --- Line 7215 ---
inputMode = 'keyboard';

// --- Line 7216 ---
keyboardBtn.innerHTML = '??'; // Clock icon

// --- Line 7217 ---
keyboardBtn.title = 'Usar rel�gio';

// --- Line 7218 ---
faceContainer.style.display = 'none';

// --- Line 7219 ---
keyboardMsg.style.display = 'block';

// --- Line 7220 ---


// --- Line 7221 ---
hourInput.readOnly = false;

// --- Line 7222 ---
minuteInput.readOnly = false;

// --- Line 7223 ---
hourInput.classList.add('active');

// --- Line 7224 ---
minuteInput.classList.add('active');

// --- Line 7225 ---
hourInput.focus();

// --- Line 7226 ---
hourInput.select();

// --- Line 7227 ---
} else {

// --- Line 7228 ---
// Switch to analog mode

// --- Line 7229 ---
inputMode = 'analog';

// --- Line 7230 ---
keyboardBtn.innerHTML = '??';

// --- Line 7231 ---
keyboardBtn.title = 'Digitar hor�rio';

// --- Line 7232 ---
faceContainer.style.display = 'block';

// --- Line 7233 ---
keyboardMsg.style.display = 'none';

// --- Line 7234 ---


// --- Line 7235 ---
// Parse values currently in inputs, clamp if invalid

// --- Line 7236 ---
let h = parseInt(hourInput.value, 10);

// --- Line 7237 ---
let m = parseInt(minuteInput.value, 10);

// --- Line 7238 ---
if (isNaN(h) || h < 0 || h > 23) h = 9;

// --- Line 7239 ---
if (isNaN(m) || m < 0 || m > 59) m = 0;

// --- Line 7240 ---
currentHour = h;

// --- Line 7241 ---
currentMinute = m;

// --- Line 7242 ---


// --- Line 7243 ---
hourInput.value = to2(currentHour);

// --- Line 7244 ---
minuteInput.value = to2(currentMinute);

// --- Line 7245 ---


// --- Line 7246 ---
hourInput.readOnly = true;

// --- Line 7247 ---
minuteInput.readOnly = true;

// --- Line 7248 ---


// --- Line 7249 ---
activeMode = 'hour';

// --- Line 7250 ---
hourInput.classList.add('active');

// --- Line 7251 ---
minuteInput.classList.remove('active');

// --- Line 7252 ---
renderFace();

// --- Line 7253 ---
}

// --- Line 7254 ---
};

// --- Line 7255 ---


// --- Line 7256 ---
// Limit keyboard entry logic

// --- Line 7257 ---
hourInput.oninput = () => {

// --- Line 7258 ---
hourInput.value = hourInput.value.replace(/[^0-9]/g, '');

// --- Line 7259 ---
let v = parseInt(hourInput.value, 10);

// --- Line 7260 ---
if (hourInput.value.length >= 2) {

// --- Line 7261 ---
if (!isNaN(v)) {

// --- Line 7262 ---
if (v > 23) hourInput.value = '23';

// --- Line 7263 ---
currentHour = parseInt(hourInput.value, 10);

// --- Line 7264 ---
}

// --- Line 7265 ---
minuteInput.focus();

// --- Line 7266 ---
minuteInput.select();

// --- Line 7267 ---
}

// --- Line 7268 ---
};

// --- Line 7269 ---
minuteInput.oninput = () => {

// --- Line 7270 ---
minuteInput.value = minuteInput.value.replace(/[^0-9]/g, '');

// --- Line 7271 ---
let v = parseInt(minuteInput.value, 10);

// --- Line 7272 ---
if (minuteInput.value.length >= 2) {

// --- Line 7273 ---
if (!isNaN(v) && v > 59) {

// --- Line 7274 ---
minuteInput.value = '59';

// --- Line 7275 ---
}

// --- Line 7276 ---
if (!isNaN(v)) {

// --- Line 7277 ---
currentMinute = parseInt(minuteInput.value, 10);

// --- Line 7278 ---
}

// --- Line 7279 ---
}

// --- Line 7280 ---
};

// --- Line 7281 ---
hourInput.onblur = () => {

// --- Line 7282 ---
let v = parseInt(hourInput.value, 10);

// --- Line 7283 ---
if (isNaN(v) || v < 0 || v > 23) v = 9;

// --- Line 7284 ---
currentHour = v;

// --- Line 7285 ---
hourInput.value = to2(currentHour);

// --- Line 7286 ---
};

// --- Line 7287 ---
minuteInput.onblur = () => {

// --- Line 7288 ---
let v = parseInt(minuteInput.value, 10);

// --- Line 7289 ---
if (isNaN(v) || v < 0 || v > 59) v = 0;

// --- Line 7290 ---
currentMinute = v;

// --- Line 7291 ---
minuteInput.value = to2(currentMinute);

// --- Line 7292 ---
};

// --- Line 7293 ---


// --- Line 7294 ---
// OK / Cancel Action Handlers

// --- Line 7295 ---
cancelBtn.onclick = () => {

// --- Line 7296 ---
backdrop.remove();

// --- Line 7297 ---
};

// --- Line 7298 ---


// --- Line 7299 ---
okBtn.onclick = () => {

// --- Line 7300 ---
let h = parseInt(hourInput.value, 10);

// --- Line 7301 ---
let m = parseInt(minuteInput.value, 10);

// --- Line 7302 ---
if (isNaN(h) || h < 0 || h > 23) h = currentHour;

// --- Line 7303 ---
if (isNaN(m) || m < 0 || m > 59) m = currentMinute;

// --- Line 7304 ---


// --- Line 7305 ---
h = Math.min(23, Math.max(0, h));

// --- Line 7306 ---
m = Math.min(59, Math.max(0, m));

// --- Line 7307 ---


// --- Line 7308 ---
const formattedTime = to2(h) + ':' + to2(m);

// --- Line 7309 ---
onSelect(formattedTime);

// --- Line 7310 ---
backdrop.remove();

// --- Line 7311 ---
};

// --- Line 7312 ---


// --- Line 7313 ---
// Close on pressing Escape inside picker

// --- Line 7314 ---
backdrop.addEventListener('keydown', (e) => {

// --- Line 7315 ---
if (e.key === 'Escape') {

// --- Line 7316 ---
e.preventDefault();

// --- Line 7317 ---
cancelBtn.click();

// --- Line 7318 ---
} else if (e.key === 'Enter') {

// --- Line 7319 ---
e.preventDefault();

// --- Line 7320 ---
okBtn.click();

// --- Line 7321 ---
}

// --- Line 7322 ---
});

// --- Line 7323 ---
}

// --- Line 7324 ---


// --- Line 7325 ---
function openBoardFilters() {

// --- Line 7326 ---
const vBoards = getVisibleBoardsInTodos();

// --- Line 7327 ---
showModal('Filtrar Quadros', function () {

// --- Line 7328 ---
const wrap = el('div');

// --- Line 7329 ---
wrap.style.display = 'flex';

// --- Line 7330 ---
wrap.style.flexDirection = 'column';

// --- Line 7331 ---
wrap.style.gap = '10px';

// --- Line 7332 ---
wrap.style.minWidth = '280px';

// --- Line 7333 ---
wrap.style.color = '#fff';

// --- Line 7334 ---


// --- Line 7335 ---
// Select All / Deselect All buttons

// --- Line 7336 ---
const btnRow = el('div');

// --- Line 7337 ---
btnRow.style.display = 'flex';

// --- Line 7338 ---
btnRow.style.gap = '8px';

// --- Line 7339 ---
btnRow.style.marginBottom = '6px';

// --- Line 7340 ---


// --- Line 7341 ---
const selectAll = el('button');

// --- Line 7342 ---
selectAll.type = 'button';

// --- Line 7343 ---
selectAll.textContent = 'Selecionar Todos';

// --- Line 7344 ---
selectAll.style.flex = '1';

// --- Line 7345 ---
selectAll.style.background = 'var(--brand)';

// --- Line 7346 ---
selectAll.style.border = 'none';

// --- Line 7347 ---
selectAll.style.borderRadius = '6px';

// --- Line 7348 ---
selectAll.style.padding = '6px';

// --- Line 7349 ---
selectAll.style.color = '#fff';

// --- Line 7350 ---
selectAll.style.cursor = 'pointer';

// --- Line 7351 ---
selectAll.onclick = () => {

// --- Line 7352 ---
wrap.querySelectorAll('.board-filter-chk').forEach(chk => chk.checked = true);

// --- Line 7353 ---
};

// --- Line 7354 ---


// --- Line 7355 ---
const deselectAll = el('button');

// --- Line 7356 ---
deselectAll.type = 'button';

// --- Line 7357 ---
deselectAll.textContent = 'Desmarcar Todos';

// --- Line 7358 ---
deselectAll.style.flex = '1';

// --- Line 7359 ---
deselectAll.style.background = '#3a3f4b';

// --- Line 7360 ---
deselectAll.style.border = 'none';

// --- Line 7361 ---
deselectAll.style.borderRadius = '6px';

// --- Line 7362 ---
deselectAll.style.padding = '6px';

// --- Line 7363 ---
deselectAll.style.color = '#fff';

// --- Line 7364 ---
deselectAll.style.cursor = 'pointer';

// --- Line 7365 ---
deselectAll.onclick = () => {

// --- Line 7366 ---
wrap.querySelectorAll('.board-filter-chk').forEach(chk => chk.checked = false);

// --- Line 7367 ---
};

// --- Line 7368 ---


// --- Line 7369 ---
btnRow.appendChild(selectAll);

// --- Line 7370 ---
btnRow.appendChild(deselectAll);

// --- Line 7371 ---
wrap.appendChild(btnRow);

// --- Line 7372 ---


// --- Line 7373 ---
const listWrap = el('div', 'filter-checkbox-list');

// --- Line 7374 ---


// --- Line 7375 ---
// Add a checkbox for each board (except trash and board-todos)

// --- Line 7376 ---
boardsMeta.forEach(b => {

// --- Line 7377 ---
if (b.id === 'board-trash' || b.id === 'board-todos') return;

// --- Line 7378 ---


// --- Line 7379 ---
const label = el('label');

// --- Line 7380 ---
label.style.display = 'flex';

// --- Line 7381 ---
label.style.alignItems = 'center';

// --- Line 7382 ---
label.style.gap = '10px';

// --- Line 7383 ---
label.style.fontSize = '14px';

// --- Line 7384 ---
label.style.cursor = 'pointer';

// --- Line 7385 ---
label.style.padding = '4px 0';

// --- Line 7386 ---


// --- Line 7387 ---
const checked = vBoards.has(b.id) ? 'checked' : '';

// --- Line 7388 ---
label.innerHTML = `

// --- Line 7389 ---
<input type="checkbox" class="board-filter-chk" data-id="${b.id}" ${checked} 
       style="cursor: pointer; width: 16px; height: 16px;">

// --- Line 7390 ---
<span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; 
       background: ${b.color || '#1976d2'};"></span>

// --- Line 7391 ---
<span>${b.name}</span>

// --- Line 7392 ---
`;

// --- Line 7393 ---
listWrap.appendChild(label);

// --- Line 7394 ---
});

// --- Line 7395 ---
wrap.appendChild(listWrap);

// --- Line 7396 ---


// --- Line 7397 ---
return wrap;

// --- Line 7398 ---
}, function (body, wrap) {

// --- Line 7399 ---
const newVisible = new Set();

// --- Line 7400 ---
body.querySelectorAll('.board-filter-chk').forEach(chk => {

// --- Line 7401 ---
if (chk.checked) {

// --- Line 7402 ---
newVisible.add(chk.dataset.id);

// --- Line 7403 ---
}

// --- Line 7404 ---
});

// --- Line 7405 ---
visibleBoardsInTodos = newVisible;

// --- Line 7406 ---
localStorage.setItem(LS_VISIBLE_BOARDS, JSON.stringify(Array.from(newVisible)));

// --- Line 7407 ---
loadAndRenderAll();

// --- Line 7408 ---
});

// --- Line 7409 ---
}

// --- Line 7410 ---


// --- Line 7411 ---
function openColorFilters() {

// --- Line 7412 ---
const PALETTE = buildFullPalette();

// --- Line 7413 ---
showModal('Filtrar por Etiquetas', function () {

// --- Line 7414 ---
const wrap = el('div');

// --- Line 7415 ---
wrap.style.display = 'flex';

// --- Line 7416 ---
wrap.style.flexDirection = 'column';

// --- Line 7417 ---
wrap.style.gap = '10px';

// --- Line 7418 ---
wrap.style.minWidth = '300px';

// --- Line 7419 ---
wrap.style.color = '#fff';

// --- Line 7420 ---


// --- Line 7421 ---
// Help/Instruction

// --- Line 7422 ---
const info = el('div');

// --- Line 7423 ---
info.textContent = 'Selecione quais etiquetas deseja exibir. Cart�es com cores desmarcadas 
       ser�o ocultados.';

// --- Line 7424 ---
info.style.fontSize = '12px';

// --- Line 7425 ---
info.style.color = '#9fb3d2';

// --- Line 7426 ---
info.style.marginBottom = '6px';

// --- Line 7427 ---
wrap.appendChild(info);

// --- Line 7428 ---


// --- Line 7429 ---
// Select All / Deselect All buttons

// --- Line 7430 ---
const btnRow = el('div');

// --- Line 7431 ---
btnRow.style.display = 'flex';

// --- Line 7432 ---
btnRow.style.gap = '8px';

// --- Line 7433 ---
btnRow.style.marginBottom = '6px';

// --- Line 7434 ---


// --- Line 7435 ---
const selectAll = el('button');

// --- Line 7436 ---
selectAll.type = 'button';

// --- Line 7437 ---
selectAll.textContent = 'Selecionar Todas';

// --- Line 7438 ---
selectAll.style.flex = '1';

// --- Line 7439 ---
selectAll.style.background = 'var(--brand)';

// --- Line 7440 ---
selectAll.style.border = 'none';

// --- Line 7441 ---
selectAll.style.borderRadius = '6px';

// --- Line 7442 ---
selectAll.style.padding = '6px';

// --- Line 7443 ---
selectAll.style.color = '#fff';

// --- Line 7444 ---
selectAll.style.cursor = 'pointer';

// --- Line 7445 ---
selectAll.onclick = () => {

// --- Line 7446 ---
wrap.querySelectorAll('.color-filter-chk').forEach(chk => chk.checked = true);

// --- Line 7447 ---
};

// --- Line 7448 ---


// --- Line 7449 ---
const deselectAll = el('button');

// --- Line 7450 ---
deselectAll.type = 'button';

// --- Line 7451 ---
deselectAll.textContent = 'Desmarcar Todas';

// --- Line 7452 ---
deselectAll.style.flex = '1';

// --- Line 7453 ---
deselectAll.style.background = '#3a3f4b';

// --- Line 7454 ---
deselectAll.style.border = 'none';

// --- Line 7455 ---
deselectAll.style.borderRadius = '6px';

// --- Line 7456 ---
deselectAll.style.padding = '6px';

// --- Line 7457 ---
deselectAll.style.color = '#fff';

// --- Line 7458 ---
deselectAll.style.cursor = 'pointer';

// --- Line 7459 ---
deselectAll.onclick = () => {

// --- Line 7460 ---
wrap.querySelectorAll('.color-filter-chk').forEach(chk => chk.checked = false);

// --- Line 7461 ---
};

// --- Line 7462 ---


// --- Line 7463 ---
btnRow.appendChild(selectAll);

// --- Line 7464 ---
btnRow.appendChild(deselectAll);

// --- Line 7465 ---
wrap.appendChild(btnRow);

// --- Line 7466 ---


// --- Line 7467 ---
const listWrap = el('div', 'filter-checkbox-list');

// --- Line 7468 ---


// --- Line 7469 ---
// 1. Sem cor (No color) item

// --- Line 7470 ---
const noColorLabel = el('label');

// --- Line 7471 ---
noColorLabel.style.display = 'flex';

// --- Line 7472 ---
noColorLabel.style.alignItems = 'center';

// --- Line 7473 ---
noColorLabel.style.gap = '10px';

// --- Line 7474 ---
noColorLabel.style.fontSize = '14px';

// --- Line 7475 ---
noColorLabel.style.cursor = 'pointer';

// --- Line 7476 ---
noColorLabel.style.padding = '4px 0';

// --- Line 7477 ---


// --- Line 7478 ---
const noColorChecked = (selectedColors.size === 0 || selectedColors.has('')) ? 'checked' : 
       '';

// --- Line 7479 ---
noColorLabel.innerHTML = `

// --- Line 7480 ---
<input type="checkbox" class="color-filter-chk" data-hex="" ${noColorChecked} 
       style="cursor: pointer; width: 16px; height: 16px;">

// --- Line 7481 ---
<span style="display: inline-block; width: 12px; height: 12px; border-radius: 4px; 
       border: 1px dashed #9fb3d2; background: transparent;"></span>

// --- Line 7482 ---
<span>Sem etiqueta</span>

// --- Line 7483 ---
`;

// --- Line 7484 ---
listWrap.appendChild(noColorLabel);

// --- Line 7485 ---


// --- Line 7486 ---
// 2. Palette colors

// --- Line 7487 ---
PALETTE.forEach(p => {

// --- Line 7488 ---
const label = el('label');

// --- Line 7489 ---
label.style.display = 'flex';

// --- Line 7490 ---
label.style.alignItems = 'center';

// --- Line 7491 ---
label.style.gap = '10px';

// --- Line 7492 ---
label.style.fontSize = '14px';

// --- Line 7493 ---
label.style.cursor = 'pointer';

// --- Line 7494 ---
label.style.padding = '4px 0';

// --- Line 7495 ---


// --- Line 7496 ---
const checked = (selectedColors.size === 0 || selectedColors.has(p.hex.toLowerCase())) 
       ? 'checked' : '';

// --- Line 7497 ---
label.innerHTML = `

// --- Line 7498 ---
<input type="checkbox" class="color-filter-chk" data-hex="${p.hex.toLowerCase()}" 
       ${checked} style="cursor: pointer; width: 16px; height: 16px;">

// --- Line 7499 ---
<span style="display: inline-block; width: 12px; height: 12px; border-radius: 4px; 
       background: ${p.hex};"></span>

// --- Line 7500 ---
<span>${p.name}</span>

// --- Line 7501 ---
`;

// --- Line 7502 ---
listWrap.appendChild(label);

// --- Line 7503 ---
});

// --- Line 7504 ---
wrap.appendChild(listWrap);

// --- Line 7505 ---


// --- Line 7506 ---
return wrap;

// --- Line 7507 ---
}, function (body, wrap) {

// --- Line 7508 ---
const checkedCheckboxes = body.querySelectorAll('.color-filter-chk:checked');

// --- Line 7509 ---
const allCheckboxes = body.querySelectorAll('.color-filter-chk');

// --- Line 7510 ---


// --- Line 7511 ---
selectedColors.clear();

// --- Line 7512 ---


// --- Line 7513 ---
if (checkedCheckboxes.length < allCheckboxes.length) {

// --- Line 7514 ---
checkedCheckboxes.forEach(chk => {

// --- Line 7515 ---
selectedColors.add(chk.dataset.hex);

// --- Line 7516 ---
});

// --- Line 7517 ---
}

// --- Line 7518 ---


// --- Line 7519 ---
applyFilters();

// --- Line 7520 ---
});

// --- Line 7521 ---
}

// --- Line 7522 ---


// --- Line 7523 ---
// ===== WEEKLY VIEW =====

// --- Line 7524 ---
function getWeekRange(dateStr) {

// --- Line 7525 ---
const curr = new Date(dateStr + 'T12:00:00');

// --- Line 7526 ---
const first = curr.getDate() - curr.getDay();

// --- Line 7527 ---
const week = [];

// --- Line 7528 ---
for (let i = 0; i < 7; i++) {

// --- Line 7529 ---
const next = new Date(curr); next.setDate(first + i); week.push(next.toISOString().slice(0, 
       10));

// --- Line 7530 ---
}

// --- Line 7531 ---
return week;

// --- Line 7532 ---
}

// --- Line 7533 ---


// --- Line 7534 ---
let weeklyActiveDate = new Date().toISOString().slice(0, 10);

// --- Line 7535 ---


// --- Line 7536 ---
function renderWeeklyView() {

// --- Line 7537 ---
if (!weeklyGrid || weeklyContainer.classList.contains('collapsed')) return;

// --- Line 7538 ---
weeklyGrid.innerHTML = '';

// --- Line 7539 ---
const currentDay = weeklyActiveDate;

// --- Line 7540 ---
const weekDates = getWeekRange(currentDay);

// --- Line 7541 ---
const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S�b'];

// --- Line 7542 ---
const startW = weekDates[0].split('-').reverse().slice(0, 2).join('/');

// --- Line 7543 ---
const endW = weekDates[6].split('-').reverse().slice(0, 2).join('/');

// --- Line 7544 ---
document.getElementById('weekRangeDisplay').textContent = `${startW} - ${endW}`;

// --- Line 7545 ---


// --- Line 7546 ---
weekDates.forEach((date, index) => {

// --- Line 7547 ---
const col = el('div', 'day-column');

// --- Line 7548 ---
if (date === currentDay) col.classList.add('today');

// --- Line 7549 ---
const header = el('header');

// --- Line 7550 ---


// --- Line 7551 ---
const textWrap = el('div');

// --- Line 7552 ---
textWrap.style.textAlign = 'left';

// --- Line 7553 ---
textWrap.innerHTML = `${daysOfWeek[index]} <span 
       class="date-label">${date.split('-').reverse().slice(0, 2).join('/')}</span>`;

// --- Line 7554 ---
header.appendChild(textWrap);

// --- Line 7555 ---


// --- Line 7556 ---
const addBtn = el('button', 'weekly-add-btn');

// --- Line 7557 ---
addBtn.type = 'button';

// --- Line 7558 ---
addBtn.title = 'Adicionar cart�o';

// --- Line 7559 ---
addBtn.textContent = '+';

// --- Line 7560 ---
addBtn.addEventListener('click', function(e) {

// --- Line 7561 ---
e.stopPropagation();

// --- Line 7562 ---
const newCard = createCard({ text: '', when: date + 'T' });

// --- Line 7563 ---
renderWeeklyView();

// --- Line 7564 ---
const clone = Array.from(weeklyGrid.querySelectorAll('.mirror-card')).find(c => 
       c._originalReference === newCard);

// --- Line 7565 ---
if (clone) {

// --- Line 7566 ---
startInlineEdit(clone, true);

// --- Line 7567 ---
}

// --- Line 7568 ---
});

// --- Line 7569 ---
header.appendChild(addBtn);

// --- Line 7570 ---


// --- Line 7571 ---
col.appendChild(header);

// --- Line 7572 ---
const cardsContainer = el('div', 'cards');

// --- Line 7573 ---
cardsContainer.dataset.date = date;

// --- Line 7574 ---
wireDropZone(cardsContainer);

// --- Line 7575 ---


// --- Line 7576 ---
const dayPrefix = date + 'T';

// --- Line 7577 ---
const floatingCards = allCards.filter(c => { const w = c.dataset.when || ''; return w === 
       dayPrefix || w === dayPrefix + 'GOAL'; });

// --- Line 7578 ---
const scheduledCards = allCards.filter(c => { const w = c.dataset.when || ''; return 
       w.startsWith(dayPrefix) && w.length > 11 && w !== dayPrefix + 'GOAL'; });

// --- Line 7579 ---
scheduledCards.sort((a, b) => (a.dataset.when || '').localeCompare(b.dataset.when || ''));

// --- Line 7580 ---


// --- Line 7581 ---
function createInteractiveMirror(originalCard, isScheduled) {

// --- Line 7582 ---
const clone = originalCard.cloneNode(true);

// --- Line 7583 ---
clone.classList.add('mirror-card');

// --- Line 7584 ---
if (isScheduled) clone.classList.add('is-scheduled');

// --- Line 7585 ---
clone.classList.remove('selected', 'dragging', 'timer-running', 'timer-finished');

// --- Line 7586 ---
clone.style.animation = '';

// --- Line 7587 ---
clone._originalReference = originalCard;

// --- Line 7588 ---


// --- Line 7589 ---
const kb = clone.querySelector('.kebab');

// --- Line 7590 ---
if (kb) {

// --- Line 7591 ---
kb.addEventListener('click', function(ev) {

// --- Line 7592 ---
ev.stopPropagation();

// --- Line 7593 ---
clearSelection();

// --- Line 7594 ---
addSelection(originalCard);

// --- Line 7595 ---
var r = kb.getBoundingClientRect();

// --- Line 7596 ---
showCtx(r.right, r.bottom, originalCard);

// --- Line 7597 ---
});

// --- Line 7598 ---
}

// --- Line 7599 ---


// --- Line 7600 ---
const dot = clone.querySelector('.dot');

// --- Line 7601 ---
if (dot) {

// --- Line 7602 ---
dot.addEventListener('click', function(e) {

// --- Line 7603 ---
e.stopPropagation();

// --- Line 7604 ---
const ev = new PointerEvent('click', { bubbles: true, cancelable: true, view: 
       window });

// --- Line 7605 ---
originalCard.querySelector('.dot').dispatchEvent(ev); 

// --- Line 7606 ---
});

// --- Line 7607 ---
dot.addEventListener('dblclick', (e) => e.stopPropagation());

// --- Line 7608 ---
}

// --- Line 7609 ---


// --- Line 7610 ---
clone.addEventListener('mousedown', function (e) {

// --- Line 7611 ---
if (e.button !== 0) return;

// --- Line 7612 ---
const ev = new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: 
       window, button: 0, shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey });

// --- Line 7613 ---
originalCard.dispatchEvent(ev);

// --- Line 7614 ---
});

// --- Line 7615 ---


// --- Line 7616 ---
clone.addEventListener('dblclick', function (e) {

// --- Line 7617 ---
if (e.target.closest('.dot')) {

// --- Line 7618 ---
e.stopPropagation(); return;

// --- Line 7619 ---
}

// --- Line 7620 ---
handleCardDblClick(originalCard);

// --- Line 7621 ---
});

// --- Line 7622 ---


// --- Line 7623 ---
clone.addEventListener('contextmenu', function (e) {

// --- Line 7624 ---
e.preventDefault();

// --- Line 7625 ---
e.stopPropagation();

// --- Line 7626 ---
clearSelection();

// --- Line 7627 ---
addSelection(originalCard);

// --- Line 7628 ---
showCtx(e.clientX, e.clientY, originalCard);

// --- Line 7629 ---
});

// --- Line 7630 ---


// --- Line 7631 ---
clone.addEventListener('dragstart', function (e) {

// --- Line 7632 ---
e.stopPropagation();

// --- Line 7633 ---
const block = selected.has(originalCard) ? Array.from(selected) : [originalCard];

// --- Line 7634 ---
dragState = { leader: originalCard, block: block };

// --- Line 7635 ---
block.forEach(n => n.classList.add('dragging'));

// --- Line 7636 ---
clone.classList.add('dragging');

// --- Line 7637 ---
pushPH();

// --- Line 7638 ---
try { e.dataTransfer.setData('text/plain', 'drag'); e.dataTransfer.effectAllowed = 
       'move'; } catch (_) { }

// --- Line 7639 ---
});

// --- Line 7640 ---
clone.addEventListener('dragend', function () {

// --- Line 7641 ---
clone.classList.remove('dragging');

// --- Line 7642 ---
if (dragState && dragState.block) {

// --- Line 7643 ---
dragState.block.forEach(n => n.classList.remove('dragging'));

// --- Line 7644 ---
}

// --- Line 7645 ---
cleanupPH();

// --- Line 7646 ---
dragState = null;

// --- Line 7647 ---
persist();

// --- Line 7648 ---
updateSlotsHasItems();

// --- Line 7649 ---
updateTotalTimerDisplay();

// --- Line 7650 ---
});

// --- Line 7651 ---
return clone;

// --- Line 7652 ---
}

// --- Line 7653 ---


// --- Line 7654 ---
scheduledCards.forEach(originalCard => {

// --- Line 7655 ---
const clone = createInteractiveMirror(originalCard, true);

// --- Line 7656 ---
const timeStr = (originalCard.dataset.when || '').split('T')[1];

// --- Line 7657 ---
if (timeStr) {

// --- Line 7658 ---
let timeBadge = clone.querySelector('.due-date.time-badge');

// --- Line 7659 ---
if (!timeBadge) {

// --- Line 7660 ---
timeBadge = el('span', 'due-date time-badge');

// --- Line 7661 ---
timeBadge.style.backgroundColor = 'var(--brand)';

// --- Line 7662 ---
timeBadge.style.color = 'white';

// --- Line 7663 ---
timeBadge.style.marginRight = '5px';

// --- Line 7664 ---
const cardHeader = clone.querySelector('.card-header');

// --- Line 7665 ---
if (cardHeader) {

// --- Line 7666 ---
const kbBtn = cardHeader.querySelector('.kebab');

// --- Line 7667 ---
if (kbBtn) cardHeader.insertBefore(timeBadge, kbBtn);

// --- Line 7668 ---
else cardHeader.appendChild(timeBadge);

// --- Line 7669 ---
}

// --- Line 7670 ---
}

// --- Line 7671 ---
timeBadge.textContent = timeStr;

// --- Line 7672 ---
}

// --- Line 7673 ---
cardsContainer.appendChild(clone);

// --- Line 7674 ---
});

// --- Line 7675 ---


// --- Line 7676 ---
floatingCards.forEach(originalCard => {

// --- Line 7677 ---
const clone = createInteractiveMirror(originalCard, false);

// --- Line 7678 ---
let info = clone.querySelector('.due-date.info-badge');

// --- Line 7679 ---
if (!info) {

// --- Line 7680 ---
info = el('span', 'due-date info-badge');

// --- Line 7681 ---
info.textContent = 'A definir';

// --- Line 7682 ---
info.style.opacity = '0.5';

// --- Line 7683 ---
const cardHeader = clone.querySelector('.card-header');

// --- Line 7684 ---
if (cardHeader) {

// --- Line 7685 ---
const kbBtn = cardHeader.querySelector('.kebab');

// --- Line 7686 ---
if (kbBtn) cardHeader.insertBefore(info, kbBtn);

// --- Line 7687 ---
else cardHeader.appendChild(info);

// --- Line 7688 ---
}

// --- Line 7689 ---
}

// --- Line 7690 ---
cardsContainer.appendChild(clone);

// --- Line 7691 ---
});

// --- Line 7692 ---


// --- Line 7693 ---
col.appendChild(cardsContainer);

// --- Line 7694 ---
weeklyGrid.appendChild(col);

// --- Line 7695 ---
});

// --- Line 7696 ---
syncMirrors();

// --- Line 7697 ---
}

// --- Line 7698 ---


// --- Line 7699 ---
function changeWeek(offset) {

// --- Line 7700 ---
const currentDate = new Date(weeklyActiveDate + 'T12:00:00');

// --- Line 7701 ---
currentDate.setDate(currentDate.getDate() + (offset * 7));

// --- Line 7702 ---
weeklyActiveDate = currentDate.toISOString().slice(0, 10);

// --- Line 7703 ---
applyFilters();

// --- Line 7704 ---
}

// --- Line 7705 ---
document.getElementById('prevWeekBtn').addEventListener('click', () => changeWeek(-1));

// --- Line 7706 ---
document.getElementById('nextWeekBtn').addEventListener('click', () => changeWeek(1));

// --- Line 7707 ---
document.getElementById('todayWeekBtn').addEventListener('click', () => {

// --- Line 7708 ---
weeklyActiveDate = new Date().toISOString().slice(0, 10);

// --- Line 7709 ---
applyFilters();

// --- Line 7710 ---
});

// --- Line 7711 ---


// --- Line 7712 ---
// ===== INITIALIZATION =====

// --- Line 7713 ---
const toggleAgendaBtn = document.getElementById('toggleAgendaBtn');

// --- Line 7714 ---
const workspaceEl = document.querySelector('.workspace');

// --- Line 7715 ---
const AGENDA_STATE_KEY = 'mini-trello-agenda-state';

// --- Line 7716 ---
const toggleBoardBtn = document.getElementById('toggleBoardBtn');

// --- Line 7717 ---
const toggleMatrixBtn = document.getElementById('toggleMatrixBtn');

// --- Line 7718 ---
const boardContainer = document.querySelector('.board-container');

// --- Line 7719 ---
const matrixContainer = document.querySelector('.matrix-container');

// --- Line 7720 ---
const agendaSidebar = document.getElementById('agenda-sidebar');

// --- Line 7721 ---
const mainContent = document.getElementById('main-content');

// --- Line 7722 ---
const weeklyContainer = document.querySelector('.weekly-container');

// --- Line 7723 ---
const weeklyGrid = document.getElementById('weeklyGrid');

// --- Line 7724 ---
const toggleWeeklyBtn = document.getElementById('toggleWeeklyBtn');

// --- Line 7725 ---
const BOARD_STATE_KEY = 'mini-trello-board-state';

// --- Line 7726 ---
const MATRIX_STATE_KEY = 'mini-trello-matrix-state';

// --- Line 7727 ---
const WEEKLY_STATE_KEY = 'mini-trello-weekly-state';

// --- Line 7728 ---
const quickConfigToggle = document.getElementById('quickConfigToggle');

// --- Line 7729 ---
const quickConfigToggleBtn = quickConfigToggle.nextElementSibling;

// --- Line 7730 ---


// --- Line 7731 ---
function saveState() {

// --- Line 7732 ---
localStorage.setItem(AGENDA_STATE_KEY, agendaSidebar.classList.contains('collapsed') ? 
       'collapsed' : 'open');

// --- Line 7733 ---
localStorage.setItem(BOARD_STATE_KEY, boardContainer.classList.contains('collapsed') ? 
       'collapsed' : 'open');

// --- Line 7734 ---
localStorage.setItem(MATRIX_STATE_KEY, matrixContainer.classList.contains('collapsed') ? 
       'collapsed' : 'open');

// --- Line 7735 ---
localStorage.setItem(WEEKLY_STATE_KEY, weeklyContainer.classList.contains('collapsed') ? 
       'collapsed' : 'open');

// --- Line 7736 ---
}

// --- Line 7737 ---


// --- Line 7738 ---
function loadState() {

// --- Line 7739 ---
const agendaState = localStorage.getItem(AGENDA_STATE_KEY);

// --- Line 7740 ---
const boardState = localStorage.getItem(BOARD_STATE_KEY);

// --- Line 7741 ---
const matrixState = localStorage.getItem(MATRIX_STATE_KEY);

// --- Line 7742 ---
const quickConfigState = localStorage.getItem(LS_QUICK_CONFIG_KEY);

// --- Line 7743 ---


// --- Line 7744 ---
if (agendaState === 'collapsed') { agendaSidebar.classList.add('collapsed'); 
       workspaceEl.classList.add('agenda-collapsed'); toggleAgendaBtn.classList.remove('active'); }

// --- Line 7745 ---
else { agendaSidebar.classList.remove('collapsed'); 
       workspaceEl.classList.remove('agenda-collapsed'); toggleAgendaBtn.classList.add('active'); }

// --- Line 7746 ---


// --- Line 7747 ---
if (boardState === 'collapsed') { boardContainer.classList.add('collapsed'); 
       mainContent.classList.add('board-collapsed'); toggleBoardBtn.classList.remove('active'); }

// --- Line 7748 ---
else { boardContainer.classList.remove('collapsed'); 
       mainContent.classList.remove('board-collapsed'); toggleBoardBtn.classList.add('active'); }

// --- Line 7749 ---


// --- Line 7750 ---
if (matrixState === 'collapsed') { matrixContainer.classList.add('collapsed'); 
       mainContent.classList.add('matrix-collapsed'); toggleMatrixBtn.classList.remove('active'); }

// --- Line 7751 ---
else { matrixContainer.classList.remove('collapsed'); 
       mainContent.classList.remove('matrix-collapsed'); toggleMatrixBtn.classList.add('active'); }

// --- Line 7752 ---


// --- Line 7753 ---
if (quickConfigState === 'true') { quickConfigToggle.checked = true; 
       quickConfigToggleBtn.textContent = 'ON'; }

// --- Line 7754 ---
else { quickConfigToggle.checked = false; quickConfigToggleBtn.textContent = 'OFF'; }

// --- Line 7755 ---
}

// --- Line 7756 ---


// --- Line 7757 ---
const weeklyState = localStorage.getItem(WEEKLY_STATE_KEY);

// --- Line 7758 ---
if (weeklyState === 'open') { weeklyContainer.classList.remove('collapsed'); 
       toggleWeeklyBtn.classList.add('active'); renderWeeklyView(); }

// --- Line 7759 ---
else { weeklyContainer.classList.add('collapsed'); toggleWeeklyBtn.classList.remove('active'); }

// --- Line 7760 ---


// --- Line 7761 ---
toggleBoardBtn.addEventListener('click', () => { boardContainer.classList.toggle('collapsed'); 
       mainContent.classList.toggle('board-collapsed'); toggleBoardBtn.classList.toggle('active'); saveState(); });

// --- Line 7762 ---
toggleMatrixBtn.addEventListener('click', () => { matrixContainer.classList.toggle('collapsed'); 
       mainContent.classList.toggle('matrix-collapsed'); toggleMatrixBtn.classList.toggle('active'); saveState(); });

// --- Line 7763 ---
toggleAgendaBtn.addEventListener('click', () => { agendaSidebar.classList.toggle('collapsed'); 
       workspaceEl.classList.toggle('agenda-collapsed'); toggleAgendaBtn.classList.toggle('active'); saveState(); });

// --- Line 7764 ---
toggleWeeklyBtn.addEventListener('click', () => { weeklyContainer.classList.toggle('collapsed'); 
       toggleWeeklyBtn.classList.toggle('active'); if (!weeklyContainer.classList.contains('collapsed')) { 
       renderWeeklyView(); } saveState(); });

// --- Line 7765 ---
document.getElementById('toggleSelectionModeBtn').onclick = toggleSelectionMode;

// --- Line 7766 ---
quickConfigToggle.addEventListener('change', () => { const isChecked = quickConfigToggle.checked; 
       quickConfigToggleBtn.textContent = isChecked ? 'ON' : 'OFF'; localStorage.setItem(LS_QUICK_CONFIG_KEY, 
       isChecked); });

// --- Line 7767 ---


// --- Line 7768 ---
document.getElementById('addList').onclick = function () { createList('Nova lista'); persist(); };

// --- Line 7769 ---
document.getElementById('filterColorsBtn').addEventListener('click', openColorFilters);

// --- Line 7770 ---
document.getElementById('filterBoardsBtn').addEventListener('click', openBoardFilters);

// --- Line 7771 ---
document.getElementById('undo').onclick = doUndo; document.getElementById('redo').onclick = doRedo;

// --- Line 7772 ---
document.getElementById('clearFilters').onclick = function () { selectedColors.clear(); 
       document.getElementById('fFrom').value = ''; document.getElementById('fTo').value = ''; 
       document.getElementById('fTime').value = ''; applyFilters(); };

// --- Line 7773 ---


// --- Line 7774 ---
// Eventos dos submenus e dropdowns

// --- Line 7775 ---
document.getElementById('menuNewBoard').onclick = () => { const name = prompt('Nome do novo 
       quadro:'); if (name) createNewBoard(name); };

// --- Line 7776 ---
document.getElementById('menuRenameBoard').onclick = renameBoard;

// --- Line 7777 ---
document.getElementById('menuCloneBoard').onclick = cloneBoard;

// --- Line 7778 ---
document.getElementById('menuDeleteBoard').onclick = deleteBoard;

// --- Line 7779 ---
document.getElementById('menuBoardTheme').onclick = openBoardThemePicker;

// --- Line 7780 ---
document.getElementById('menuExportJson').onclick = exportBackup;

// --- Line 7781 ---
document.getElementById('menuImportJson').onclick = () => 
       document.getElementById('importFile').click();

// --- Line 7782 ---


// --- Line 7783 ---
document.getElementById('importFile').addEventListener('change', function(e) {

// --- Line 7784 ---
const file = e.target.files[0];

// --- Line 7785 ---
if (file) importBackup(file);

// --- Line 7786 ---
e.target.value = '';

// --- Line 7787 ---
});

// --- Line 7788 ---


// --- Line 7789 ---
document.getElementById('boardSelect').onchange = (e) => switchBoard(e.target.value);

// --- Line 7790 ---


// --- Line 7791 ---
// Controle de Dropdowns (mobile friendly & click outside)

// --- Line 7792 ---
document.querySelectorAll('.header-dropdown-btn').forEach(btn => {

// --- Line 7793 ---
btn.addEventListener('click', function(e) {

// --- Line 7794 ---
e.stopPropagation();

// --- Line 7795 ---
const parent = this.parentElement;

// --- Line 7796 ---
document.querySelectorAll('.header-dropdown').forEach(d => {

// --- Line 7797 ---
if (d !== parent) d.classList.remove('active');

// --- Line 7798 ---
});

// --- Line 7799 ---
parent.classList.toggle('active');

// --- Line 7800 ---
});

// --- Line 7801 ---
});

// --- Line 7802 ---
document.addEventListener('click', function() {

// --- Line 7803 ---
document.querySelectorAll('.header-dropdown').forEach(d => {

// --- Line 7804 ---
d.classList.remove('active');

// --- Line 7805 ---
});

// --- Line 7806 ---
});

// --- Line 7807 ---


// --- Line 7808 ---


// --- Line 7809 ---
const agendaDateInput = document.getElementById('agendaDate');

// --- Line 7810 ---
function changeDay(days) { let currentDate = new Date(agendaDateInput.value + 'T12:00:00'); 
       currentDate.setDate(currentDate.getDate() + days); agendaDateInput.value = currentDate.toISOString().slice(0, 
       10); applyFilters(); }

// --- Line 7811 ---
document.getElementById('prevDayBtn').addEventListener('click', () => changeDay(-1));

// --- Line 7812 ---
document.getElementById('nextDayBtn').addEventListener('click', () => changeDay(1));

// --- Line 7813 ---
document.getElementById('todayDayBtn').addEventListener('click', () => {

// --- Line 7814 ---
agendaDateInput.value = new Date().toISOString().slice(0, 10);

// --- Line 7815 ---
applyFilters();

// --- Line 7816 ---
});

// --- Line 7817 ---
agendaDateInput.addEventListener('change', applyFilters);

// --- Line 7818 ---


// --- Line 7819 ---
boardEl.addEventListener('wheel', (e) => { if (e.altKey) { e.preventDefault(); boardEl.scrollLeft 
       += e.deltaY; } });

// --- Line 7820 ---


// --- Line 7821 ---
// Scroll Drag logic

// --- Line 7822 ---
const mainScrollContainer = document.getElementById('main-content');

// --- Line 7823 ---
let scrollSpeed = { x: 0, y: 0 };

// --- Line 7824 ---
let scrollFrame = null;

// --- Line 7825 ---
function performAutoScroll() {

// --- Line 7826 ---
if (scrollSpeed.x === 0 && scrollSpeed.y === 0) { scrollFrame = null; return; }

// --- Line 7827 ---
mainScrollContainer.scrollBy(scrollSpeed.x, scrollSpeed.y);

// --- Line 7828 ---
scrollFrame = requestAnimationFrame(performAutoScroll);

// --- Line 7829 ---
}

// --- Line 7830 ---
function applyDragScroll() {

// --- Line 7831 ---
const containers = [document.getElementById('board'), document.getElementById('main-content'), 
       document.getElementById('slots')];

// --- Line 7832 ---
containers.forEach(container => {

// --- Line 7833 ---
if (!container) return;

// --- Line 7834 ---
let isDown = false; let startX, startY, scrollLeft, scrollTop;

// --- Line 7835 ---
container.addEventListener('mousedown', (e) => {

// --- Line 7836 ---
if (e.target.closest('.card') || e.target.tagName === 'BUTTON' || e.target.tagName === 
       'INPUT' || e.target.closest('.header-icon')) return;

// --- Line 7837 ---
isDown = true; container.style.cursor = 'grabbing'; startX = e.pageX; startY = e.pageY; 
       scrollLeft = container.scrollLeft; scrollTop = container.scrollTop;

// --- Line 7838 ---
});

// --- Line 7839 ---
const stopDrag = () => { if (isDown) { isDown = false; container.style.cursor = 'grab'; } };

// --- Line 7840 ---
container.addEventListener('mouseleave', stopDrag); container.addEventListener('mouseup', 
       stopDrag);

// --- Line 7841 ---
container.addEventListener('mousemove', (e) => {

// --- Line 7842 ---
if (!isDown) return; e.preventDefault();

// --- Line 7843 ---
const x = e.pageX; const y = e.pageY; const walkX = (x - startX) * 1; const walkY = (y 
       - startY) * 1;

// --- Line 7844 ---
container.scrollLeft = scrollLeft - walkX; container.scrollTop = scrollTop - walkY;

// --- Line 7845 ---
});

// --- Line 7846 ---
});

// --- Line 7847 ---
}

// --- Line 7848 ---


// --- Line 7849 ---
document.getElementById('copyDayBtn').addEventListener('click', function () {

// --- Line 7850 ---
const day = getActiveDay();

// --- Line 7851 ---
agendaClipboard = allCards.filter(c => (c.dataset.when || '').startsWith(day + 'T')).map(c => 
       ({ ...cardToData(c), timeOrGoal: (c.dataset.when || '').substring(11) }));

// --- Line 7852 ---
const btn = document.getElementById('copyDayBtn'); btn.textContent = 'Copiado!'; setTimeout(() 
       => { btn.textContent = '??'; }, 1000);

// --- Line 7853 ---
});

// --- Line 7854 ---
document.getElementById('pasteDayBtn').addEventListener('click', function () {

// --- Line 7855 ---
if (agendaClipboard.length === 0) { const btn = document.getElementById('pasteDayBtn'); 
       btn.textContent = 'Vazio!'; setTimeout(() => { btn.textContent = '??'; }, 1000); return; }

// --- Line 7856 ---
const day = getActiveDay();

// --- Line 7857 ---
agendaClipboard.forEach(cardData => {

// --- Line 7858 ---
const newData = { ...cardData }; newData.when = day + 'T' + newData.timeOrGoal;

// --- Line 7859 ---
const existsInCache = allCards.some(c => c.dataset.when === newData.when && 
       c.querySelector('.text').textContent.trim() === newData.text.trim());

// --- Line 7860 ---
if (!existsInCache) createCard(newData);

// --- Line 7861 ---
});

// --- Line 7862 ---
updateSlotsHasItems(); persist();

// --- Line 7863 ---
});

// --- Line 7864 ---


// --- Line 7865 ---
$$('#fFrom, #fTo, #fTime').forEach(function (el) { el.addEventListener('input', applyFilters); });

// --- Line 7866 ---


// --- Line 7867 ---
document.addEventListener('keydown', function (e) {

// --- Line 7868 ---
if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? 
       doRedo() : doUndo(); return; }

// --- Line 7869 ---


// --- Line 7870 ---
// AJUSTE: Copiar / Colar / Recortar

// --- Line 7871 ---
if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {

// --- Line 7872 ---
if (document.activeElement.tagName === 'INPUT' || document.activeElement.isContentEditable) 
       return;

// --- Line 7873 ---
e.preventDefault();

// --- Line 7874 ---
appClipboard = Array.from(selected).map(cardToData);

// --- Line 7875 ---
return;

// --- Line 7876 ---
}

// --- Line 7877 ---
if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {

// --- Line 7878 ---
if (document.activeElement.tagName === 'INPUT' || document.activeElement.isContentEditable) 
       return;

// --- Line 7879 ---
e.preventDefault();

// --- Line 7880 ---
appClipboard = Array.from(selected).map(cardToData);

// --- Line 7881 ---
selected.forEach(card => removeCard(card));

// --- Line 7882 ---
clearSelection();

// --- Line 7883 ---
return;

// --- Line 7884 ---
}

// --- Line 7885 ---
if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {

// --- Line 7886 ---
if (document.activeElement.tagName === 'INPUT' || document.activeElement.isContentEditable) 
       return;

// --- Line 7887 ---
if (appClipboard.length === 0) return;

// --- Line 7888 ---
e.preventDefault();

// --- Line 7889 ---


// --- Line 7890 ---
// Tenta achar lista sob o mouse

// --- Line 7891 ---
const hoveredList = $$('.list').find(l => {

// --- Line 7892 ---
const r = l.getBoundingClientRect();

// --- Line 7893 ---
return lastMouseX >= r.left && lastMouseX <= r.right && lastMouseY >= r.top && 
       lastMouseY <= r.bottom;

// --- Line 7894 ---
});

// --- Line 7895 ---


// --- Line 7896 ---
const targetContainer = hoveredList ? (hoveredList.querySelector('.cards') || hoveredList) 
       : boardEl.querySelector('.list .cards');

// --- Line 7897 ---
if (targetContainer) {

// --- Line 7898 ---
appClipboard.forEach(data => {

// --- Line 7899 ---
const newCard = createCard(data);

// --- Line 7900 ---
targetContainer.appendChild(newCard);

// --- Line 7901 ---
if (hoveredList) applyWhen(hoveredList, [newCard]);

// --- Line 7902 ---
});

// --- Line 7903 ---
persist(); updateSlotsHasItems();

// --- Line 7904 ---
}

// --- Line 7905 ---
return;

// --- Line 7906 ---
}

// --- Line 7907 ---


// --- Line 7908 ---
if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {

// --- Line 7909 ---
if (document.activeElement.tagName === 'INPUT' && document.activeElement.closest('.add')) 
       return;

// --- Line 7910 ---
e.preventDefault();

// --- Line 7911 ---
let targetList = null; let insertAfterCard = null;

// --- Line 7912 ---
if (selected.size > 0) { insertAfterCard = Array.from(selected).pop(); targetList = 
       insertAfterCard.closest('.list'); }

// --- Line 7913 ---
else {

// --- Line 7914 ---
const lists = $$('.list');

// --- Line 7915 ---
targetList = lists.find(l => { if (l.offsetParent === null) return false; const rect = 
       l.getBoundingClientRect(); return lastMouseX >= rect.left && lastMouseX <= rect.right && lastMouseY >= rect.top 
       && lastMouseY <= rect.bottom; });

// --- Line 7916 ---
if (!targetList || targetList.offsetParent === null) targetList = 
       boardEl.querySelector('.list[data-type="kanban"]');

// --- Line 7917 ---
}

// --- Line 7918 ---
if (targetList) {

// --- Line 7919 ---
const cardsContainer = targetList.querySelector('.cards');

// --- Line 7920 ---
if (cardsContainer) {

// --- Line 7921 ---
const newCard = createCard({ text: '' });

// --- Line 7922 ---
if (insertAfterCard && insertAfterCard.parentElement === cardsContainer) 
       cardsContainer.insertBefore(newCard, insertAfterCard.nextSibling); else cardsContainer.appendChild(newCard);

// --- Line 7923 ---
applyWhen(targetList, [newCard]); persist(); updateTotalTimerDisplay(); 
       startInlineEdit(newCard, true);

// --- Line 7924 ---
}

// --- Line 7925 ---
}

// --- Line 7926 ---
return;

// --- Line 7927 ---
}

// --- Line 7928 ---
var currentSelection = getSelectionOr(ctxTarget);

// --- Line 7929 ---
const activeEl = document.activeElement;

// --- Line 7930 ---
const isEditingCard = activeEl.isContentEditable && activeEl.classList.contains('text') && 
       activeEl.closest('.card');

// --- Line 7931 ---
if (e.key === 'F2') {

// --- Line 7932 ---
e.preventDefault();

// --- Line 7933 ---
if (isEditingCard) activeEl.blur(); else if (currentSelection.length > 0) 
       startInlineEdit(currentSelection[0]);

// --- Line 7934 ---
return;

// --- Line 7935 ---
}

// --- Line 7936 ---
if ((activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || 
       activeEl.closest('.modal')) || (isEditingCard)) {

// --- Line 7937 ---
if (isEditingCard && (e.key === 'Delete' || e.key === 'Backspace') && 
       activeEl.textContent.trim() === '') { e.preventDefault(); const cardToDelete = [activeEl.closest('.card')]; 
       showConfirm('Excluir cart�o vazio?', function () { cardToDelete.forEach(n => removeCard(n)); clearSelection(); 
       }); }

// --- Line 7938 ---
return;

// --- Line 7939 ---
}

// --- Line 7940 ---
if (!currentSelection.length && !ctxTarget && (e.key === 'Delete' || e.key === 'Backspace')) 
       return;

// --- Line 7941 ---
if (currentSelection.length > 0 && e.altKey) {

// --- Line 7942 ---
if (e.key.toLowerCase() === 't') { e.preventDefault(); openTimerDialog(currentSelection); }

// --- Line 7943 ---
else if (e.key.toLowerCase() === 'c') { e.preventDefault(); 
       openColorDialog(currentSelection); }

// --- Line 7944 ---
else if (e.key.toLowerCase() === 'd') { e.preventDefault(); 
       openDateDialog(currentSelection); }

// --- Line 7945 ---
else if (e.key.toLowerCase() === 'p') { 

// --- Line 7946 ---
e.preventDefault();

// --- Line 7947 ---
const activeProps = document.querySelector('.modal-wrap');

// --- Line 7948 ---
if (activeProps && activeProps.querySelector('h3') && 
       activeProps.querySelector('h3').textContent === 'Propriedades do Cart�o') {

// --- Line 7949 ---
activeProps.remove();

// --- Line 7950 ---
} else {

// --- Line 7951 ---
showPropertiesDialog(currentSelection[0]);

// --- Line 7952 ---
}

// --- Line 7953 ---
}

// --- Line 7954 ---
return;

// --- Line 7955 ---
}

// --- Line 7956 ---


// --- Line 7957 ---
// Shift + Setas (Cima / Baixo) para mover cart�o pela agenda

// --- Line 7958 ---
if (currentSelection.length > 0 && e.shiftKey) {

// --- Line 7959 ---
if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {

// --- Line 7960 ---
let targetCard = currentSelection[0];

// --- Line 7961 ---
let mirrorCard = Array.from(slotsRoot.querySelectorAll('.card')).find(clone => 
       clone._originalReference === targetCard);

// --- Line 7962 ---
let currentSlot = (mirrorCard ? mirrorCard.closest('#slots > .list') : null) || 
       targetCard.closest('#slots > .list');

// --- Line 7963 ---


// --- Line 7964 ---
if (currentSlot) {

// --- Line 7965 ---
e.preventDefault();

// --- Line 7966 ---
const slots = Array.from(slotsRoot.children);

// --- Line 7967 ---
const currentIndex = slots.indexOf(currentSlot);

// --- Line 7968 ---
let targetIndex = e.key === 'ArrowUp' ? currentIndex - 1 : currentIndex + 1;

// --- Line 7969 ---


// --- Line 7970 ---
if (targetIndex >= 0 && targetIndex < slots.length) {

// --- Line 7971 ---
const targetSlot = slots[targetIndex];

// --- Line 7972 ---
if (targetSlot.dataset.type === 'goal') {

// --- Line 7973 ---
targetCard.dataset.when = getActiveDay() + 'TGOAL';

// --- Line 7974 ---
} else if (targetSlot.dataset.type === 'unscheduled') {

// --- Line 7975 ---
targetCard.dataset.when = getActiveDay() + 'T';

// --- Line 7976 ---
} else if (targetSlot.dataset.type === 'time') {

// --- Line 7977 ---
targetCard.dataset.when = getActiveDay() + 'T' + targetSlot.dataset.time;

// --- Line 7978 ---
}

// --- Line 7979 ---
persist(); loadAndRenderAll();

// --- Line 7980 ---
updateSlotsHasItems();

// --- Line 7981 ---


// --- Line 7982 ---
// Focar e rolar para o novo espelho gerado na agenda

// --- Line 7983 ---
setTimeout(() => {

// --- Line 7984 ---
let newMirror = Array.from(slotsRoot.querySelectorAll('.card')).find(clone 
       => clone._originalReference === targetCard);

// --- Line 7985 ---
if (newMirror) {

// --- Line 7986 ---
newMirror.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

// --- Line 7987 ---
}

// --- Line 7988 ---
}, 50);

// --- Line 7989 ---
}

// --- Line 7990 ---
return;

// --- Line 7991 ---
}

// --- Line 7992 ---
}

// --- Line 7993 ---
}

// --- Line 7994 ---


// --- Line 7995 ---
if (currentSelection.length > 0 && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') { 
       e.preventDefault(); duplicateCards(currentSelection); return; }

// --- Line 7996 ---
if (currentSelection.length > 0 && (e.key === 'Delete' || e.key === 'Backspace')) { 
       e.preventDefault(); showConfirm('Excluir ' + currentSelection.length + ' cart�o(s)?', function () { 
       currentSelection.forEach(function (n) { removeCard(n); }); clearSelection(); }); return; }

// --- Line 7997 ---
if (currentSelection.length > 0 && (e.ctrlKey || e.metaKey)) {

// --- Line 7998 ---
let moved = false;

// --- Line 7999 ---
let targetCard = currentSelection[0];

// --- Line 8000 ---
let parentCards = targetCard.parentElement;

// --- Line 8001 ---
let parentList = targetCard.closest('.list');

// --- Line 8002 ---
if (!parentCards || !parentList) return;

// --- Line 8003 ---


// --- Line 8004 ---
if (e.key === 'ArrowUp') {

// --- Line 8005 ---
e.preventDefault();

// --- Line 8006 ---
let previousCard = targetCard.previousElementSibling;

// --- Line 8007 ---
while (previousCard && previousCard.style.display === 'none') {

// --- Line 8008 ---
previousCard = previousCard.previousElementSibling;

// --- Line 8009 ---
}

// --- Line 8010 ---
if (previousCard) {

// --- Line 8011 ---
currentSelection.forEach(card => parentCards.insertBefore(card, previousCard));

// --- Line 8012 ---
moved = true;

// --- Line 8013 ---
}

// --- Line 8014 ---
} else if (e.key === 'ArrowDown') {

// --- Line 8015 ---
e.preventDefault();

// --- Line 8016 ---
let lastCardInSelection = currentSelection[currentSelection.length - 1];

// --- Line 8017 ---
let nextCard = lastCardInSelection.nextElementSibling;

// --- Line 8018 ---
while (nextCard && nextCard.style.display === 'none') {

// --- Line 8019 ---
nextCard = nextCard.nextElementSibling;

// --- Line 8020 ---
}

// --- Line 8021 ---
if (nextCard) {

// --- Line 8022 ---
currentSelection.forEach(card => parentCards.insertBefore(card, nextCard));

// --- Line 8023 ---
moved = true;

// --- Line 8024 ---
} else {

// --- Line 8025 ---
currentSelection.forEach(card => parentCards.appendChild(card));

// --- Line 8026 ---
moved = true;

// --- Line 8027 ---
}

// --- Line 8028 ---
} else if (e.key === 'ArrowLeft' && parentList.dataset.type === 'kanban') {

// --- Line 8029 ---
e.preventDefault();

// --- Line 8030 ---
let prevList = parentList.previousElementSibling;

// --- Line 8031 ---
while (prevList && !prevList.matches('.list[data-type="kanban"]')) {

// --- Line 8032 ---
prevList = prevList.previousElementSibling;

// --- Line 8033 ---
}

// --- Line 8034 ---
if (prevList) {

// --- Line 8035 ---
let destCards = prevList.querySelector('.cards');

// --- Line 8036 ---
applyWhen(prevList, currentSelection);

// --- Line 8037 ---
currentSelection.forEach(card => destCards.appendChild(card));

// --- Line 8038 ---
moved = true;

// --- Line 8039 ---
}

// --- Line 8040 ---
} else if (e.key === 'ArrowRight' && parentList.dataset.type === 'kanban') {

// --- Line 8041 ---
e.preventDefault();

// --- Line 8042 ---
let nextList = parentList.nextElementSibling;

// --- Line 8043 ---
while (nextList && !nextList.matches('.list[data-type="kanban"]')) {

// --- Line 8044 ---
nextList = nextList.nextElementSibling;

// --- Line 8045 ---
}

// --- Line 8046 ---
if (nextList) {

// --- Line 8047 ---
let destCards = nextList.querySelector('.cards');

// --- Line 8048 ---
applyWhen(nextList, currentSelection);

// --- Line 8049 ---
currentSelection.forEach(card => destCards.appendChild(card));

// --- Line 8050 ---
moved = true;

// --- Line 8051 ---
}

// --- Line 8052 ---
}

// --- Line 8053 ---


// --- Line 8054 ---
if (moved) {

// --- Line 8055 ---
persist();

// --- Line 8056 ---
applyFilters();

// --- Line 8057 ---
}

// --- Line 8058 ---
}

// --- Line 8059 ---
});

// --- Line 8060 ---


// --- Line 8061 ---
document.addEventListener('dragover', (e) => {

// --- Line 8062 ---
if (!dragState) return;

// --- Line 8063 ---
const threshold = 100; const speed = 12; const rect = 
       mainScrollContainer.getBoundingClientRect();

// --- Line 8064 ---
scrollSpeed = { x: 0, y: 0 };

// --- Line 8065 ---
if (e.clientY < rect.top + threshold) scrollSpeed.y = -speed; else if (e.clientY > rect.bottom 
       - threshold) scrollSpeed.y = speed;

// --- Line 8066 ---
if (e.clientX < rect.left + threshold) scrollSpeed.x = -speed; else if (e.clientX > rect.right 
       - threshold) scrollSpeed.x = speed;

// --- Line 8067 ---
if ((scrollSpeed.x !== 0 || scrollSpeed.y !== 0) && !scrollFrame) scrollFrame = 
       requestAnimationFrame(performAutoScroll);

// --- Line 8068 ---
});

// --- Line 8069 ---


// --- Line 8070 ---
function stopScrollParams() { scrollSpeed = { x: 0, y: 0 }; if (scrollFrame) { 
       cancelAnimationFrame(scrollFrame); scrollFrame = null; } }

// --- Line 8071 ---
document.addEventListener('dragend', stopScrollParams); document.addEventListener('drop', 
       stopScrollParams); document.addEventListener('mouseleave', stopScrollParams);

// --- Line 8072 ---


// --- Line 8073 ---
function initDemo() {

// --- Line 8074 ---
withMute(function () {

// --- Line 8075 ---
var toDo = createList('Para Fazer');

// --- Line 8076 ---
toDo.querySelector('.cards').appendChild(createCard({ text: 'Tarefa importante e urgente', 
       color: '#104239', timerTotal: '1800' }));

// --- Line 8077 ---
createList('Em Andamento'); createList('Feito');

// --- Line 8078 ---
if (matrixEl) { var q1 = matrixEl.querySelector('.list[data-quad="Q1"] .cards'); 
       q1.appendChild(createCard({ text: 'Crise: Resolver problema no servidor!', color: '#104239', timerTotal: '7200' 
       })); }

// --- Line 8079 ---
createCard({ text: "Definir meta principal do dia", when: `${getActiveDay()}TGOAL`, 
       timerTotal: '900' });

// --- Line 8080 ---
});

// --- Line 8081 ---
applyFilters(); updateSlotsHasItems(); updateTotalTimerDisplay();

// --- Line 8082 ---
}

// --- Line 8083 ---


// --- Line 8084 ---
function updateFocusMode() {

// --- Line 8085 ---
// Se estiver no modo manual ou tela pequena

// --- Line 8086 ---
const isManual = document.body.classList.contains('manual-focus-mode');

// --- Line 8087 ---
if (window.innerWidth < 700 || isManual) {

// --- Line 8088 ---
const runningCard = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

// --- Line 8089 ---
if (runningCard) {

// --- Line 8090 ---
document.body.classList.add('focus-mode');

// --- Line 8091 ---
const text = runningCard.querySelector('.text').textContent;

// --- Line 8092 ---
const state = runningCard.dataset.timerState;

// --- Line 8093 ---
const disp = runningCard.querySelector('.timer-display');

// --- Line 8094 ---


// --- Line 8095 ---
document.getElementById('focusTargetText').textContent = text;

// --- Line 8096 ---
document.getElementById('focusTargetTime').textContent = disp ? 
       disp.textContent.replace('?? ', '').replace(' min', '').replace('? ', '') : '...';

// --- Line 8097 ---


// --- Line 8098 ---
const toggleBtn = document.getElementById('focusToggleBtn');

// --- Line 8099 ---
toggleBtn.textContent = state === 'running' ? '??' : '??';

// --- Line 8100 ---
return;

// --- Line 8101 ---
}

// --- Line 8102 ---
}

// --- Line 8103 ---
document.body.classList.remove('focus-mode');

// --- Line 8104 ---
}

// --- Line 8105 ---


// --- Line 8106 ---
// L�gica dos bot�es do foco

// --- Line 8107 ---
document.getElementById('focusToggleBtn').onclick = () => {

// --- Line 8108 ---
const runningCard = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

// --- Line 8109 ---
if (runningCard) {

// --- Line 8110 ---
handleCardDblClick(runningCard);

// --- Line 8111 ---
updateFocusMode();

// --- Line 8112 ---
}

// --- Line 8113 ---
};

// --- Line 8114 ---


// --- Line 8115 ---
document.getElementById('focusPlusBtn').onclick = () => {

// --- Line 8116 ---
const runningCard = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

// --- Line 8117 ---
if (runningCard) {

// --- Line 8118 ---
let left = parseInt(runningCard.dataset.timerLeft, 10) || 0;

// --- Line 8119 ---
let total = parseInt(runningCard.dataset.timerTotal, 10) || 0;

// --- Line 8120 ---
runningCard.dataset.timerLeft = left + 60;

// --- Line 8121 ---
runningCard.dataset.timerTotal = total + 60;

// --- Line 8122 ---
if (runningCard.dataset.timerState === 'running') {

// --- Line 8123 ---
let end = parseInt(runningCard.dataset.timerEnd, 10);

// --- Line 8124 ---
if (!isNaN(end)) runningCard.dataset.timerEnd = end + 60000;

// --- Line 8125 ---
else runningCard.dataset.timerEnd = Date.now() + (left + 60) * 1000;

// --- Line 8126 ---
}

// --- Line 8127 ---
updateTimerDisplay(runningCard);

// --- Line 8128 ---
updateFocusMode();

// --- Line 8129 ---
persist();

// --- Line 8130 ---
}

// --- Line 8131 ---
};

// --- Line 8132 ---


// --- Line 8133 ---
document.getElementById('focusMinusBtn').onclick = () => {

// --- Line 8134 ---
const runningCard = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

// --- Line 8135 ---
if (runningCard) {

// --- Line 8136 ---
let left = parseInt(runningCard.dataset.timerLeft, 10) || 0;

// --- Line 8137 ---
let total = parseInt(runningCard.dataset.timerTotal, 10) || 0;

// --- Line 8138 ---
if (left > 60) {

// --- Line 8139 ---
runningCard.dataset.timerLeft = left - 60;

// --- Line 8140 ---
runningCard.dataset.timerTotal = Math.max(0, total - 60);

// --- Line 8141 ---
if (runningCard.dataset.timerState === 'running') {

// --- Line 8142 ---
let end = parseInt(runningCard.dataset.timerEnd, 10);

// --- Line 8143 ---
if (!isNaN(end)) runningCard.dataset.timerEnd = end - 60000;

// --- Line 8144 ---
}

// --- Line 8145 ---
updateTimerDisplay(runningCard);

// --- Line 8146 ---
updateFocusMode();

// --- Line 8147 ---
persist();

// --- Line 8148 ---
}

// --- Line 8149 ---
}

// --- Line 8150 ---
};

// --- Line 8151 ---


// --- Line 8152 ---
document.getElementById('focusCloseBtn').onclick = () => {

// --- Line 8153 ---
document.body.classList.remove('manual-focus-mode', 'focus-mode');

// --- Line 8154 ---
};

// --- Line 8155 ---


// --- Line 8156 ---
document.getElementById('manualFocusBtn').onclick = () => {

// --- Line 8157 ---
const isRunning = document.querySelector('.card.timer-running, .card.timer-finished, 
       .card.timer-paused');

// --- Line 8158 ---
if (!isRunning) {

// --- Line 8159 ---
alert("Inicie um timer primeiro para entrar no modo foco!");

// --- Line 8160 ---
return;

// --- Line 8161 ---
}

// --- Line 8162 ---
document.body.classList.toggle('manual-focus-mode');

// --- Line 8163 ---
updateFocusMode();

// --- Line 8164 ---
};

// --- Line 8165 ---
// ===== RESIZERS LOGIC =====

// --- Line 8166 ---
function initResizers() {

// --- Line 8167 ---
const resizerSidebar = document.getElementById('resizer-sidebar');

// --- Line 8168 ---
const sidebar = document.getElementById('agenda-sidebar');

// --- Line 8169 ---
const resizerMatrix = document.getElementById('resizer-matrix');

// --- Line 8170 ---
const matrixContainer = document.getElementById('matrix-container');

// --- Line 8171 ---
const boardContainer = document.getElementById('board-container');

// --- Line 8172 ---
const resizerWeekly = document.getElementById('resizer-weekly');

// --- Line 8173 ---
const weeklyContainer = document.getElementById('weekly-container');

// --- Line 8174 ---


// --- Line 8175 ---
// Load saved sizes

// --- Line 8176 ---
try {

// --- Line 8177 ---
const saved = JSON.parse(localStorage.getItem('TEA_RESIZERS') || '{}');

// --- Line 8178 ---
if (saved.sidebarWidth && window.innerWidth > 700) sidebar.style.flexBasis = 
       saved.sidebarWidth + 'px';

// --- Line 8179 ---
if (saved.boardHeight) {

// --- Line 8180 ---
const h = parseInt(saved.boardHeight);

// --- Line 8181 ---
boardContainer.style.height = (isNaN(h) || h < 100) ? '300px' : h + 'px';

// --- Line 8182 ---
}

// --- Line 8183 ---
if (saved.weeklyHeight) {

// --- Line 8184 ---
const h = parseInt(saved.weeklyHeight);

// --- Line 8185 ---
weeklyContainer.style.height = (isNaN(h) || h < 50) ? '250px' : h + 'px';

// --- Line 8186 ---
}

// --- Line 8187 ---
} catch(e) {}

// --- Line 8188 ---


// --- Line 8189 ---
function saveResizerState() {

// --- Line 8190 ---
const state = {

// --- Line 8191 ---
sidebarWidth: sidebar.getBoundingClientRect().width,

// --- Line 8192 ---
boardHeight: boardContainer.getBoundingClientRect().height,

// --- Line 8193 ---
weeklyHeight: weeklyContainer.getBoundingClientRect().height

// --- Line 8194 ---
};

// --- Line 8195 ---
localStorage.setItem('TEA_RESIZERS', JSON.stringify(state));

// --- Line 8196 ---
}

// --- Line 8197 ---


// --- Line 8198 ---
function setupResizer(resizer, type) {

// --- Line 8199 ---
if (!resizer) return;

// --- Line 8200 ---
let isResizing = false;

// --- Line 8201 ---
let startX, startY, startWidth, startHeight;

// --- Line 8202 ---


// --- Line 8203 ---
function onStart(e) {

// --- Line 8204 ---
isResizing = true;

// --- Line 8205 ---
resizer.classList.add('resizing');

// --- Line 8206 ---
const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;

// --- Line 8207 ---
const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

// --- Line 8208 ---
startX = clientX;

// --- Line 8209 ---
startY = clientY;

// --- Line 8210 ---


// --- Line 8211 ---
if (type === 'sidebar') {

// --- Line 8212 ---
startWidth = sidebar.getBoundingClientRect().width;

// --- Line 8213 ---
} else if (type === 'matrix') {

// --- Line 8214 ---
startHeight = boardContainer.getBoundingClientRect().height;

// --- Line 8215 ---
} else if (type === 'weekly') {

// --- Line 8216 ---
startHeight = weeklyContainer.getBoundingClientRect().height;

// --- Line 8217 ---
}

// --- Line 8218 ---


// --- Line 8219 ---
// Disable transitions during resize for smooth dragging

// --- Line 8220 ---
if (type === 'sidebar') sidebar.style.transition = 'none';

// --- Line 8221 ---
if (type === 'matrix') {

// --- Line 8222 ---
boardContainer.style.transition = 'none';

// --- Line 8223 ---
matrixContainer.style.transition = 'none';

// --- Line 8224 ---
}

// --- Line 8225 ---
if (type === 'weekly') {

// --- Line 8226 ---
weeklyContainer.style.transition = 'none';

// --- Line 8227 ---
boardContainer.style.transition = 'none';

// --- Line 8228 ---
}

// --- Line 8229 ---
}

// --- Line 8230 ---


// --- Line 8231 ---
function onMove(e) {

// --- Line 8232 ---
if (!isResizing) return;

// --- Line 8233 ---
const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;

// --- Line 8234 ---
const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

// --- Line 8235 ---


// --- Line 8236 ---
if (type === 'sidebar') {

// --- Line 8237 ---
// Calcula a nova largura (sidebar est� na direita, ent�o mouse pra esquerda = 
       aumenta width)

// --- Line 8238 ---
let newWidth = startWidth - (clientX - startX);

// --- Line 8239 ---
// Limites de tamanho

// --- Line 8240 ---
if (newWidth < 200) newWidth = 200;

// --- Line 8241 ---


// --- Line 8242 ---
// Limita o crescimento para manter a propor��o dos cart�es

// --- Line 8243 ---
let maxWidth = Math.min(400, window.innerWidth * 0.8);

// --- Line 8244 ---
if (newWidth > maxWidth) newWidth = maxWidth;

// --- Line 8245 ---


// --- Line 8246 ---
sidebar.style.flexBasis = newWidth + 'px';

// --- Line 8247 ---
} else if (type === 'matrix') {

// --- Line 8248 ---
// Calcula a nova altura para o board (resizer entre board e matrix)

// --- Line 8249 ---
let newHeight = startHeight + (clientY - startY);

// --- Line 8250 ---
if (newHeight < 100) newHeight = 100; // Altura m�nima do board

// --- Line 8251 ---
if (newHeight > window.innerHeight * 0.7) newHeight = window.innerHeight * 0.7; // 
       Altura m�xima

// --- Line 8252 ---
boardContainer.style.height = newHeight + 'px';

// --- Line 8253 ---
boardContainer.style.flex = 'none'; // Ensure flex-grow doesn't override height

// --- Line 8254 ---
} else if (type === 'weekly') {

// --- Line 8255 ---
let newHeight = startHeight + (clientY - startY);

// --- Line 8256 ---
if (newHeight < 150) newHeight = 150; // Altura m�nima do weekly view

// --- Line 8257 ---
if (newHeight > window.innerHeight * 0.8) newHeight = window.innerHeight * 0.8;

// --- Line 8258 ---
weeklyContainer.style.height = newHeight + 'px';

// --- Line 8259 ---
weeklyContainer.style.flex = 'none';

// --- Line 8260 ---
}

// --- Line 8261 ---
}

// --- Line 8262 ---


// --- Line 8263 ---
function onEnd(e) {

// --- Line 8264 ---
if (!isResizing) return;

// --- Line 8265 ---
isResizing = false;

// --- Line 8266 ---
resizer.classList.remove('resizing');

// --- Line 8267 ---


// --- Line 8268 ---
// Restore transitions

// --- Line 8269 ---
if (type === 'sidebar') sidebar.style.transition = '';

// --- Line 8270 ---
if (type === 'matrix') {

// --- Line 8271 ---
boardContainer.style.transition = '';

// --- Line 8272 ---
matrixContainer.style.transition = '';

// --- Line 8273 ---
}

// --- Line 8274 ---
if (type === 'weekly') {

// --- Line 8275 ---
weeklyContainer.style.transition = '';

// --- Line 8276 ---
boardContainer.style.transition = '';

// --- Line 8277 ---
}

// --- Line 8278 ---


// --- Line 8279 ---
saveResizerState();

// --- Line 8280 ---
}

// --- Line 8281 ---


// --- Line 8282 ---
resizer.addEventListener('mousedown', onStart);

// --- Line 8283 ---
resizer.addEventListener('touchstart', onStart, { passive: true });

// --- Line 8284 ---
document.addEventListener('mousemove', onMove);

// --- Line 8285 ---
document.addEventListener('touchmove', onMove, { passive: true });

// --- Line 8286 ---
document.addEventListener('mouseup', onEnd);

// --- Line 8287 ---
document.addEventListener('touchend', onEnd);

// --- Line 8288 ---
}

// --- Line 8289 ---


// --- Line 8290 ---
setupResizer(resizerSidebar, 'sidebar');

// --- Line 8291 ---
setupResizer(resizerMatrix, 'matrix');

// --- Line 8292 ---
setupResizer(resizerWeekly, 'weekly');

// --- Line 8293 ---
}

// --- Line 8294 ---


// --- Line 8295 ---
// ===== AI ASSISTANT MOTOR / CONTROLLER =====

// --- Line 8296 ---
let aiConversationHistory = [];

// --- Line 8297 ---
let recognition = null;

// --- Line 8298 ---
let isRecording = false;

// --- Line 8299 ---


// --- Line 8300 ---
function configureApiKeyDialog() {

// --- Line 8301 ---
showModal('Configurar Intelig�ncia Artificial', function() {

// --- Line 8302 ---
const div = el('div');

// --- Line 8303 ---
div.style.padding = '8px 0';

// --- Line 8304 ---
div.style.minWidth = '320px';

// --- Line 8305 ---
div.style.maxWidth = '450px';

// --- Line 8306 ---
div.style.fontFamily = 'sans-serif';

// --- Line 8307 ---
div.style.color = '#fff';

// --- Line 8308 ---
div.innerHTML = `

// --- Line 8309 ---
<div style="margin-bottom: 15px;">

// --- Line 8310 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Provedor de IA</label>

// --- Line 8311 ---
<select id="dialogAiProvider" name="dialogAiProvider" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">

// --- Line 8312 ---
<option value="gemini">Google Gemini</option>

// --- Line 8313 ---
<option value="openai">OpenAI (ChatGPT / Compat�vel)</option>

// --- Line 8314 ---
<option value="anthropic">Anthropic (Claude)</option>

// --- Line 8315 ---
</select>

// --- Line 8316 ---
</div>

// --- Line 8317 ---


// --- Line 8318 ---
<!-- Painel Gemini -->

// --- Line 8319 ---
<div id="settings-gemini" class="provider-settings-panel" style="display: none;">

// --- Line 8320 ---
<div style="margin-bottom: 12px;">

// --- Line 8321 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Chave API do Gemini</label>

// --- Line 8322 ---
<input type="password" id="dialogGeminiApiKeyInput" 
       name="dialogGeminiApiKeyInput" placeholder="Cole sua API Key do Gemini (ex: AIzaSy...)" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8323 ---
</div>

// --- Line 8324 ---
<div style="margin-bottom: 12px;">

// --- Line 8325 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Modelo do Gemini</label>

// --- Line 8326 ---
<select id="dialogGeminiModelSelect" name="dialogGeminiModelSelect" 
       style="width:100%; padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); 
       border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">

// --- Line 8327 ---
<option value="auto">Auto (Flash/Pro Sequencial)</option>

// --- Line 8328 ---
<option value="gemini-1.5-flash">Gemini 1.5 Flash</option>

// --- Line 8329 ---
<option value="gemini-2.0-flash">Gemini 2.0 Flash</option>

// --- Line 8330 ---
<option value="gemini-2.5-flash">Gemini 2.5 Flash</option>

// --- Line 8331 ---
<option value="gemini-1.5-pro">Gemini 1.5 Pro</option>

// --- Line 8332 ---
<option value="gemini-2.0-pro-exp">Gemini 2.0 Pro Exp</option>

// --- Line 8333 ---
<option value="custom">Outro Modelo Personalizado...</option>

// --- Line 8334 ---
</select>

// --- Line 8335 ---
</div>

// --- Line 8336 ---
<div id="geminiCustomModelRow" style="margin-bottom: 12px; display: none;">

// --- Line 8337 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Nome do Modelo Personalizado</label>

// --- Line 8338 ---
<input type="text" id="dialogGeminiCustomModelInput" 
       name="dialogGeminiCustomModelInput" placeholder="ex: gemini-2.0-pro-exp-02-05" style="width:100%; padding:10px; 
       background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8339 ---
</div>

// --- Line 8340 ---
</div>

// --- Line 8341 ---


// --- Line 8342 ---
<!-- Painel OpenAI -->

// --- Line 8343 ---
<div id="settings-openai" class="provider-settings-panel" style="display: none;">

// --- Line 8344 ---
<div style="margin-bottom: 12px;">

// --- Line 8345 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Chave API da OpenAI (sk-...)</label>

// --- Line 8346 ---
<input type="password" id="dialogOpenaiApiKeyInput" 
       name="dialogOpenaiApiKeyInput" placeholder="Cole sua API Key (sk-...)" style="width:100%; padding:10px; 
       background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8347 ---
</div>

// --- Line 8348 ---
<div style="margin-bottom: 12px;">

// --- Line 8349 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Modelo da OpenAI</label>

// --- Line 8350 ---
<select id="dialogOpenaiModelSelect" name="dialogOpenaiModelSelect" 
       style="width:100%; padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); 
       border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">

// --- Line 8351 ---
<option value="gpt-4o-mini">GPT-4o Mini (Recomendado)</option>

// --- Line 8352 ---
<option value="gpt-4o">GPT-4o</option>

// --- Line 8353 ---
<option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>

// --- Line 8354 ---
<option value="custom">Outro Modelo Personalizado...</option>

// --- Line 8355 ---
</select>

// --- Line 8356 ---
</div>

// --- Line 8357 ---
<div id="openaiCustomModelRow" style="margin-bottom: 12px; display: none;">

// --- Line 8358 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Nome do Modelo Personalizado</label>

// --- Line 8359 ---
<input type="text" id="dialogOpenaiCustomModelInput" 
       name="dialogOpenaiCustomModelInput" placeholder="ex: gpt-4-turbo" style="width:100%; padding:10px; 
       background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8360 ---
</div>

// --- Line 8361 ---
<div style="margin-bottom: 12px;">

// --- Line 8362 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">URL Base da API (Opcional)</label>

// --- Line 8363 ---
<input type="text" id="dialogOpenaiCustomUrlInput" 
       name="dialogOpenaiCustomUrlInput" placeholder="Padr�o: https://api.openai.com/v1" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8364 ---
<span style="font-size: 11px; color: #88a3c7; display: block; margin-top: 4px; 
       line-height: 1.3;">Para usar OpenRouter, LM Studio, Ollama ou proxies de CORS.</span>

// --- Line 8365 ---
</div>

// --- Line 8366 ---
</div>

// --- Line 8367 ---


// --- Line 8368 ---
<!-- Painel Anthropic -->

// --- Line 8369 ---
<div id="settings-anthropic" class="provider-settings-panel" style="display: none;">

// --- Line 8370 ---
<div style="margin-bottom: 12px;">

// --- Line 8371 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Chave API da Anthropic (sk-ant-...)</label>

// --- Line 8372 ---
<input type="password" id="dialogAnthropicApiKeyInput" 
       name="dialogAnthropicApiKeyInput" placeholder="Cole sua API Key (sk-ant-...)" style="width:100%; padding:10px; 
       background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8373 ---
</div>

// --- Line 8374 ---
<div style="margin-bottom: 12px;">

// --- Line 8375 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Modelo da Anthropic</label>

// --- Line 8376 ---
<select id="dialogAnthropicModelSelect" name="dialogAnthropicModelSelect" 
       style="width:100%; padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); 
       border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">

// --- Line 8377 ---
<option value="claude-3-5-sonnet-latest">Claude 3.5 Sonnet</option>

// --- Line 8378 ---
<option value="claude-3-5-haiku-latest">Claude 3.5 Haiku</option>

// --- Line 8379 ---
<option value="claude-3-opus-latest">Claude 3 Opus</option>

// --- Line 8380 ---
<option value="custom">Outro Modelo Personalizado...</option>

// --- Line 8381 ---
</select>

// --- Line 8382 ---
</div>

// --- Line 8383 ---
<div id="anthropicCustomModelRow" style="margin-bottom: 12px; display: none;">

// --- Line 8384 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">Nome do Modelo Personalizado</label>

// --- Line 8385 ---
<input type="text" id="dialogAnthropicCustomModelInput" 
       name="dialogAnthropicCustomModelInput" placeholder="ex: claude-3-haiku-20240307" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8386 ---
</div>

// --- Line 8387 ---
<div style="margin-bottom: 12px;">

// --- Line 8388 ---
<label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 
       13px; color: #9fb3d2;">URL Base da API (Opcional)</label>

// --- Line 8389 ---
<input type="text" id="dialogAnthropicCustomUrlInput" 
       name="dialogAnthropicCustomUrlInput" placeholder="Padr�o: https://api.anthropic.com/v1" style="width:100%; 
       padding:10px; background:var(--bg); border:1px solid rgba(255, 255, 255, 0.15); border-radius:8px; color:#fff; 
       box-sizing:border-box; outline:none; font-family: inherit;">

// --- Line 8390 ---
<span style="font-size: 11px; color: #88a3c7; display: block; margin-top: 4px; 
       line-height: 1.3;">Requer um proxy de CORS para uso direto do navegador.</span>

// --- Line 8391 ---
</div>

// --- Line 8392 ---
</div>

// --- Line 8393 ---


// --- Line 8394 ---
<div style="margin-top: 15px; font-size: 11px; color: #ffa726; line-height: 1.4; 
       border-top: 1px solid rgba(255, 255, 255, 0.15); padding-top: 10px;">

// --- Line 8395 ---
<span>?? Suas credenciais s�o salvas <strong>localmente</strong> no seu navegador 
       (localStorage) com seguran�a.</span>

// --- Line 8396 ---
</div>

// --- Line 8397 ---
`;

// --- Line 8398 ---


// --- Line 8399 ---
// Setup events and load values

// --- Line 8400 ---
const providerSelect = div.querySelector('#dialogAiProvider');

// --- Line 8401 ---
const geminiModelSelect = div.querySelector('#dialogGeminiModelSelect');

// --- Line 8402 ---
const openaiModelSelect = div.querySelector('#dialogOpenaiModelSelect');

// --- Line 8403 ---
const anthropicModelSelect = div.querySelector('#dialogAnthropicModelSelect');

// --- Line 8404 ---


// --- Line 8405 ---
function updatePanelVisibility() {

// --- Line 8406 ---
const provider = providerSelect.value;

// --- Line 8407 ---
div.querySelectorAll('.provider-settings-panel').forEach(p => p.style.display = 'none');

// --- Line 8408 ---
div.querySelector('#settings-' + provider).style.display = 'block';

// --- Line 8409 ---
}

// --- Line 8410 ---


// --- Line 8411 ---
geminiModelSelect.addEventListener('change', () => {

// --- Line 8412 ---
div.querySelector('#geminiCustomModelRow').style.display = geminiModelSelect.value === 
       'custom' ? 'block' : 'none';

// --- Line 8413 ---
});

// --- Line 8414 ---
openaiModelSelect.addEventListener('change', () => {

// --- Line 8415 ---
div.querySelector('#openaiCustomModelRow').style.display = openaiModelSelect.value === 
       'custom' ? 'block' : 'none';

// --- Line 8416 ---
});

// --- Line 8417 ---
anthropicModelSelect.addEventListener('change', () => {

// --- Line 8418 ---
div.querySelector('#anthropicCustomModelRow').style.display = 
       anthropicModelSelect.value === 'custom' ? 'block' : 'none';

// --- Line 8419 ---
});

// --- Line 8420 ---


// --- Line 8421 ---
providerSelect.addEventListener('change', updatePanelVisibility);

// --- Line 8422 ---


// --- Line 8423 ---
// Load saved values

// --- Line 8424 ---
const savedProvider = localStorage.getItem('ai-provider') || 'gemini';

// --- Line 8425 ---
providerSelect.value = savedProvider;

// --- Line 8426 ---


// --- Line 8427 ---
// Load Gemini

// --- Line 8428 ---
div.querySelector('#dialogGeminiApiKeyInput').value = 
       localStorage.getItem('gemini-api-key') || '';

// --- Line 8429 ---
const savedGeminiModel = localStorage.getItem('gemini-model') || 'auto';

// --- Line 8430 ---
if (['auto', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-pro', 
       'gemini-2.0-pro-exp'].includes(savedGeminiModel)) {

// --- Line 8431 ---
geminiModelSelect.value = savedGeminiModel;

// --- Line 8432 ---
} else {

// --- Line 8433 ---
geminiModelSelect.value = 'custom';

// --- Line 8434 ---
div.querySelector('#dialogGeminiCustomModelInput').value = savedGeminiModel;

// --- Line 8435 ---
div.querySelector('#geminiCustomModelRow').style.display = 'block';

// --- Line 8436 ---
}

// --- Line 8437 ---


// --- Line 8438 ---
// Load OpenAI

// --- Line 8439 ---
div.querySelector('#dialogOpenaiApiKeyInput').value = 
       localStorage.getItem('openai-api-key') || '';

// --- Line 8440 ---
const savedOpenaiModel = localStorage.getItem('openai-model') || 'gpt-4o-mini';

// --- Line 8441 ---
if (['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'].includes(savedOpenaiModel)) {

// --- Line 8442 ---
openaiModelSelect.value = savedOpenaiModel;

// --- Line 8443 ---
} else {

// --- Line 8444 ---
openaiModelSelect.value = 'custom';

// --- Line 8445 ---
div.querySelector('#dialogOpenaiCustomModelInput').value = savedOpenaiModel;

// --- Line 8446 ---
div.querySelector('#openaiCustomModelRow').style.display = 'block';

// --- Line 8447 ---
}

// --- Line 8448 ---
div.querySelector('#dialogOpenaiCustomUrlInput').value = 
       localStorage.getItem('openai-custom-url') || '';

// --- Line 8449 ---


// --- Line 8450 ---
// Load Anthropic

// --- Line 8451 ---
div.querySelector('#dialogAnthropicApiKeyInput').value = 
       localStorage.getItem('anthropic-api-key') || '';

// --- Line 8452 ---
const savedAnthropicModel = localStorage.getItem('anthropic-model') || 
       'claude-3-5-sonnet-latest';

// --- Line 8453 ---
if (['claude-3-5-sonnet-latest', 'claude-3-5-haiku-latest', 
       'claude-3-opus-latest'].includes(savedAnthropicModel)) {

// --- Line 8454 ---
anthropicModelSelect.value = savedAnthropicModel;

// --- Line 8455 ---
} else {

// --- Line 8456 ---
anthropicModelSelect.value = 'custom';

// --- Line 8457 ---
div.querySelector('#dialogAnthropicCustomModelInput').value = savedAnthropicModel;

// --- Line 8458 ---
div.querySelector('#anthropicCustomModelRow').style.display = 'block';

// --- Line 8459 ---
}

// --- Line 8460 ---
div.querySelector('#dialogAnthropicCustomUrlInput').value = 
       localStorage.getItem('anthropic-custom-url') || '';

// --- Line 8461 ---


// --- Line 8462 ---
updatePanelVisibility();

// --- Line 8463 ---
return div;

// --- Line 8464 ---
}, function(body) {

// --- Line 8465 ---
const provider = body.querySelector('#dialogAiProvider').value;

// --- Line 8466 ---
localStorage.setItem('ai-provider', provider);

// --- Line 8467 ---


// --- Line 8468 ---
// Save Gemini

// --- Line 8469 ---
const geminiKey = body.querySelector('#dialogGeminiApiKeyInput').value.trim();

// --- Line 8470 ---
if (geminiKey) localStorage.setItem('gemini-api-key', geminiKey);

// --- Line 8471 ---
else localStorage.removeItem('gemini-api-key');

// --- Line 8472 ---


// --- Line 8473 ---
const geminiSel = body.querySelector('#dialogGeminiModelSelect').value;

// --- Line 8474 ---
const geminiModel = geminiSel === 'custom' ? 
       body.querySelector('#dialogGeminiCustomModelInput').value.trim() : geminiSel;

// --- Line 8475 ---
localStorage.setItem('gemini-model', geminiModel || 'auto');

// --- Line 8476 ---


// --- Line 8477 ---
// Save OpenAI

// --- Line 8478 ---
const openaiKey = body.querySelector('#dialogOpenaiApiKeyInput').value.trim();

// --- Line 8479 ---
if (openaiKey) localStorage.setItem('openai-api-key', openaiKey);

// --- Line 8480 ---
else localStorage.removeItem('openai-api-key');

// --- Line 8481 ---


// --- Line 8482 ---
const openaiSel = body.querySelector('#dialogOpenaiModelSelect').value;

// --- Line 8483 ---
const openaiModel = openaiSel === 'custom' ? 
       body.querySelector('#dialogOpenaiCustomModelInput').value.trim() : openaiSel;

// --- Line 8484 ---
localStorage.setItem('openai-model', openaiModel || 'gpt-4o-mini');

// --- Line 8485 ---


// --- Line 8486 ---
const openaiUrl = body.querySelector('#dialogOpenaiCustomUrlInput').value.trim();

// --- Line 8487 ---
if (openaiUrl) localStorage.setItem('openai-custom-url', openaiUrl);

// --- Line 8488 ---
else localStorage.removeItem('openai-custom-url');

// --- Line 8489 ---


// --- Line 8490 ---
// Save Anthropic

// --- Line 8491 ---
const anthropicKey = body.querySelector('#dialogAnthropicApiKeyInput').value.trim();

// --- Line 8492 ---
if (anthropicKey) localStorage.setItem('anthropic-api-key', anthropicKey);

// --- Line 8493 ---
else localStorage.removeItem('anthropic-api-key');

// --- Line 8494 ---


// --- Line 8495 ---
const anthropicSel = body.querySelector('#dialogAnthropicModelSelect').value;

// --- Line 8496 ---
const anthropicModel = anthropicSel === 'custom' ? 
       body.querySelector('#dialogAnthropicCustomModelInput').value.trim() : anthropicSel;

// --- Line 8497 ---
localStorage.setItem('anthropic-model', anthropicModel || 'claude-3-5-sonnet-latest');

// --- Line 8498 ---


// --- Line 8499 ---
const anthropicUrl = body.querySelector('#dialogAnthropicCustomUrlInput').value.trim();

// --- Line 8500 ---
if (anthropicUrl) localStorage.setItem('anthropic-custom-url', anthropicUrl);

// --- Line 8501 ---
else localStorage.removeItem('anthropic-custom-url');

// --- Line 8502 ---


// --- Line 8503 ---
alert("Configura��es de IA salvas com sucesso!");

// --- Line 8504 ---
});

// --- Line 8505 ---
}

// --- Line 8506 ---


// --- Line 8507 ---
function initSpeechRecognition() {

// --- Line 8508 ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// --- Line 8509 ---
if (!SpeechRecognition) {

// --- Line 8510 ---
console.log("Speech recognition not supported in this browser.");

// --- Line 8511 ---
const micBtn = document.getElementById('aiMicBtn');

// --- Line 8512 ---
if (micBtn) micBtn.style.display = 'none';

// --- Line 8513 ---
return;

// --- Line 8514 ---
}

// --- Line 8515 ---


// --- Line 8516 ---
recognition = new SpeechRecognition();

// --- Line 8517 ---
recognition.lang = 'pt-BR';

// --- Line 8518 ---
recognition.interimResults = false;

// --- Line 8519 ---
recognition.maxAlternatives = 1;

// --- Line 8520 ---


// --- Line 8521 ---
recognition.onstart = function() {

// --- Line 8522 ---
isRecording = true;

// --- Line 8523 ---
const micBtn = document.getElementById('aiMicBtn');

// --- Line 8524 ---
if (micBtn) {

// --- Line 8525 ---
micBtn.classList.add('recording');

// --- Line 8526 ---
micBtn.textContent = '??';

// --- Line 8527 ---
}

// --- Line 8528 ---
const sw = document.getElementById('aiSoundwave');

// --- Line 8529 ---
if (sw) sw.classList.add('active');

// --- Line 8530 ---
showAiResponseBubble("Ouvindo... Fale agora.", false, false);

// --- Line 8531 ---
};

// --- Line 8532 ---


// --- Line 8533 ---
recognition.onend = function() {

// --- Line 8534 ---
isRecording = false;

// --- Line 8535 ---
const micBtn = document.getElementById('aiMicBtn');

// --- Line 8536 ---
if (micBtn) {

// --- Line 8537 ---
micBtn.classList.remove('recording');

// --- Line 8538 ---
micBtn.textContent = '???';

// --- Line 8539 ---
}

// --- Line 8540 ---
const sw = document.getElementById('aiSoundwave');

// --- Line 8541 ---
if (sw) sw.classList.remove('active');

// --- Line 8542 ---
};

// --- Line 8543 ---


// --- Line 8544 ---
recognition.onerror = function(event) {

// --- Line 8545 ---
console.error("Speech recognition error", event.error);

// --- Line 8546 ---
showAiResponseBubble("Erro na grava��o de voz: " + event.error, false, true);

// --- Line 8547 ---
};

// --- Line 8548 ---


// --- Line 8549 ---
recognition.onresult = function(event) {

// --- Line 8550 ---
const transcript = event.results[0][0].transcript;

// --- Line 8551 ---
const inputEl = document.getElementById('aiInput');

// --- Line 8552 ---
if (inputEl) {

// --- Line 8553 ---
inputEl.value = transcript;

// --- Line 8554 ---
submitAiCommand();

// --- Line 8555 ---
}

// --- Line 8556 ---
};

// --- Line 8557 ---
}

// --- Line 8558 ---


// --- Line 8559 ---
function toggleVoiceRecord() {

// --- Line 8560 ---
if (!recognition) {

// --- Line 8561 ---
alert("O reconhecimento de voz n�o � suportado pelo seu navegador.");

// --- Line 8562 ---
return;

// --- Line 8563 ---
}

// --- Line 8564 ---
if (isRecording) {

// --- Line 8565 ---
recognition.stop();

// --- Line 8566 ---
} else {

// --- Line 8567 ---
recognition.start();

// --- Line 8568 ---
}

// --- Line 8569 ---
}

// --- Line 8570 ---


// --- Line 8571 ---
function showAiResponseBubble(message, isQuestion = false, isError = false) {

// --- Line 8572 ---
const bubble = document.getElementById('aiResponseBubble');

// --- Line 8573 ---
if (!bubble) return;

// --- Line 8574 ---


// --- Line 8575 ---
bubble.innerHTML = '';

// --- Line 8576 ---
if (isError) {

// --- Line 8577 ---
const errDiv = el('div', 'ai-error');

// --- Line 8578 ---
errDiv.textContent = message;

// --- Line 8579 ---
bubble.appendChild(errDiv);

// --- Line 8580 ---
} else if (isQuestion) {

// --- Line 8581 ---
const qDiv = el('div', 'ai-question');

// --- Line 8582 ---
qDiv.textContent = message;

// --- Line 8583 ---
bubble.appendChild(qDiv);

// --- Line 8584 ---
} else {

// --- Line 8585 ---
const expDiv = el('div', 'ai-explanation');

// --- Line 8586 ---
expDiv.textContent = message;

// --- Line 8587 ---
bubble.appendChild(expDiv);

// --- Line 8588 ---
}

// --- Line 8589 ---


// --- Line 8590 ---
bubble.classList.add('active');

// --- Line 8591 ---


// --- Line 8592 ---
if (!isQuestion && !isError && message !== 'Processando...') {

// --- Line 8593 ---
setTimeout(() => {

// --- Line 8594 ---
if (bubble.textContent === message) {

// --- Line 8595 ---
bubble.classList.remove('active');

// --- Line 8596 ---
}

// --- Line 8597 ---
}, 8000);

// --- Line 8598 ---
}

// --- Line 8599 ---
}

// --- Line 8600 ---


// --- Line 8601 ---
async function submitAiCommand() {

// --- Line 8602 ---
const inputEl = document.getElementById('aiInput');

// --- Line 8603 ---
if (!inputEl) return;

// --- Line 8604 ---
const text = inputEl.value.trim();

// --- Line 8605 ---
if (!text) return;

// --- Line 8606 ---


// --- Line 8607 ---
inputEl.value = '';

// --- Line 8608 ---
showAiResponseBubble('Processando...', false, false);

// --- Line 8609 ---


// --- Line 8610 ---
aiConversationHistory.push({ role: 'user', parts: [{ text: text }] });

// --- Line 8611 ---


// --- Line 8612 ---
const activeBoardMeta = boardsMeta.find(b => b.id === currentBoardId);

// --- Line 8613 ---
const activeBoardName = activeBoardMeta ? activeBoardMeta.name : 'Principal';

// --- Line 8614 ---
const existingBoards = boardsMeta.map(b => b.name);

// --- Line 8615 ---
const activeBoardLists = $$('.list[data-type="kanban"]', boardEl).map(l => 
       l.querySelector('.title').value);

// --- Line 8616 ---


// --- Line 8617 ---
const sysPrompt = `Voc� � a intelig�ncia artificial de controle do TEA Planner, um aplicativo 
       de produtividade que mistura Kanban, Matriz de Eisenhower (Q1, Q2, Q3, Q4) e Agenda com compromissos di�rios.

// --- Line 8618 ---


// --- Line 8619 ---
Seu objetivo � analisar o comando em linguagem natural do usu�rio (em portugu�s) e retornar um JSON contendo 
       uma lista de a��es estruturadas para o aplicativo executar.

// --- Line 8620 ---


// --- Line 8621 ---
A data de hoje no sistema �: ${getActiveDay()}.

// --- Line 8622 ---
O quadro ativo atualmente �: "${activeBoardName}".

// --- Line 8623 ---
Os quadros existentes no sistema s�o: ${JSON.stringify(existingBoards)}.

// --- Line 8624 ---
As listas no quadro ativo atualmente s�o: ${JSON.stringify(activeBoardLists)}.

// --- Line 8625 ---


// --- Line 8626 ---
Voc� deve analisar o comando e responder estritamente com um JSON no seguinte formato, sem formata��o markdown 
       (como blocos de c�digo \`\`\`json), sem textos adicionais antes ou depois.

// --- Line 8627 ---


// --- Line 8628 ---
Formato de Resposta Esperado:

// --- Line 8629 ---
{

// --- Line 8630 ---
"explanation": "Uma frase amig�vel explicando o que voc� entendeu e vai fazer.",

// --- Line 8631 ---
"question": "Se o comando for amb�guo ou necessitar de esclarecimento (por exemplo, criar uma lista mas 
       existem m�ltiplos quadros e o usu�rio n�o especificou qual, ou criar uma lista de compras mas n�o disse o nome 
       da lista), fa�a a pergunta aqui. Se 'question' estiver preenchido, o array 'actions' DEVE estar vazio.",

// --- Line 8632 ---
"actions": [

// --- Line 8633 ---
// Array de a��es a serem executadas em ordem. Pode ser vazio.

// --- Line 8634 ---
{

// --- Line 8635 ---
"type": "SWITCH_BOARD",

// --- Line 8636 ---
"boardName": "Nome exato do quadro para o qual mudar"

// --- Line 8637 ---
},

// --- Line 8638 ---
{

// --- Line 8639 ---
"type": "CREATE_LIST",

// --- Line 8640 ---
"boardName": "Nome do quadro", // Opcional (assume o atual se omitido)

// --- Line 8641 ---
"listTitle": "Nome da Lista"

// --- Line 8642 ---
},

// --- Line 8643 ---
{

// --- Line 8644 ---
"type": "CREATE_CARDS",

// --- Line 8645 ---
"boardName": "Nome do quadro", // Opcional (assume o atual se omitido)

// --- Line 8646 ---
"listTitle": "Nome da Lista",  // Opcional se for para Matriz ou Agenda

// --- Line 8647 ---
"quadrant": "Q1" | "Q2" | "Q3" | "Q4", // Opcional (s� preencha se for para a Matriz de Eisenhower)

// --- Line 8648 ---
"time": "HH:MM", // Opcional (s� preencha se for para a Agenda, ex: "10:00")

// --- Line 8649 ---
"goal": true | false, // Opcional (se for o Objetivo do Dia na agenda)

// --- Line 8650 ---
"cards": [

// --- Line 8651 ---
{

// --- Line 8652 ---
"text": "Texto do cart�o",

// --- Line 8653 ---
"color": "#hex_opcional",

// --- Line 8654 ---
"due": "YYYY-MM-DD" // Opcional (prazo final, formato YYYY-MM-DD)

// --- Line 8655 ---
}

// --- Line 8656 ---
]

// --- Line 8657 ---
},

// --- Line 8658 ---
{

// --- Line 8659 ---
"type": "COMPLETE_CARDS",

// --- Line 8660 ---
"timeRange": "morning" | "afternoon" | "evening" | "night" | "all", // Opcional (para completar 
       compromissos do per�odo da manh�/tarde/noite/tudo)

// --- Line 8661 ---
"time": "HH:MM", // Opcional (completar compromisso de um hor�rio espec�fico)

// --- Line 8662 ---
"listTitle": "Nome da Lista", // Opcional (completar todos os cart�es desta lista no kanban)

// --- Line 8663 ---
"quadrant": "Q1" | "Q2" | "Q3" | "Q4", // Opcional (completar todos os cart�es deste quadrante)

// --- Line 8664 ---
"all": true | false // Opcional

// --- Line 8665 ---
},

// --- Line 8666 ---
{

// --- Line 8667 ---
"type": "COPY_PASTE_AGENDA",

// --- Line 8668 ---
"fromDay": "YYYY-MM-DD",

// --- Line 8669 ---
"toDay": "YYYY-MM-DD"

// --- Line 8670 ---
},

// --- Line 8671 ---
{

// --- Line 8672 ---
"type": "DELETE_LIST",

// --- Line 8673 ---
"listTitle": "Nome da Lista"

// --- Line 8674 ---
},

// --- Line 8675 ---
{

// --- Line 8676 ---
"type": "DELETE_CARD",

// --- Line 8677 ---
"cardText": "Texto ou trecho do cartão a ser deletado"

// --- Line 8678 ---
},

// --- Line 8679 ---
{

// --- Line 8680 ---
"type": "DUPLICATE_CARD",

// --- Line 8681 ---
"cardText": "Texto ou trecho do cartão a ser duplicado"

// --- Line 8682 ---
},

// --- Line 8683 ---
{

// --- Line 8684 ---
"type": "MOVE_CARD",

// --- Line 8685 ---
"cardText": "Texto ou trecho do cartão a ser movido",

// --- Line 8686 ---
"targetListTitle": "Nome da lista destino, ou quadrante como Q1/Q2/Q3/Q4, ou horário como HH:MM",

// --- Line 8687 ---
"targetBoardName": "Nome do quadro de destino"

// --- Line 8688 ---
},

// --- Line 8689 ---
{

// --- Line 8690 ---
"type": "MOVE_LIST",

// --- Line 8691 ---
"listTitle": "Nome da lista a ser movida",

// --- Line 8692 ---
"targetBoardName": "Nome do quadro de destino"

// --- Line 8693 ---
},

// --- Line 8694 ---
{

// --- Line 8695 ---
"type": "CHANGE_THEME",

// --- Line 8696 ---
"color": "Cor desejada (pode ser o nome em português como verde, azul, rosa ou o hex da cor)"

// --- Line 8697 ---
},

// --- Line 8698 ---
{

// --- Line 8699 ---
"type": "START_TIMER",

// --- Line 8700 ---
"cardText": "Texto do cartão para o qual iniciar o timer"

// --- Line 8701 ---
},

// --- Line 8702 ---
{

// --- Line 8703 ---
"type": "PAUSE_TIMER",

// --- Line 8704 ---
"cardText": "Texto do cartão para o qual pausar o timer"

// --- Line 8705 ---
},

// --- Line 8706 ---
{

// --- Line 8707 ---
"type": "TOGGLE_PANEL",

// --- Line 8708 ---
"panel": "kanban" | "matrix" | "agenda" | "weekly"

// --- Line 8709 ---
}

// --- Line 8710 ---
]

// --- Line 8711 ---
}

// --- Line 8712 ---


// --- Line 8713 ---
Regras Importantes:

// --- Line 8714 ---
1. Sempre responda em formato JSON v�lido e parse�vel pelo JSON.parse(). N�o retorne explica��es fora do JSON.

// --- Line 8715 ---
2. Identifique datas relativas baseadas no dia de hoje: "hoje" � ${getActiveDay()}, "amanh�" � o dia seguinte, 
       "ontem" � o dia anterior, etc.

// --- Line 8716 ---
3. Se o usu�rio quiser criar cart�es na agenda, use "time" ou "goal". Exemplo: "Consulta m�dica 10h" -> type: 
       CREATE_CARDS com time: "10:00".

// --- Line 8717 ---
4. Se o usu�rio quiser criar uma lista e cart�es (ex: "lista de feira com batata e brocolis"), e houver 
       m�ltiplos quadros no sistema, mas ele n�o disser em qual quadro: pergunte em qual quadro ele deseja criar 
       preenchendo o campo "question".

// --- Line 8718 ---
5. Se houver apenas 1 quadro cadastrado no sistema al�m da Lixeira, crie a lista diretamente nele sem perguntar.

// --- Line 8719 ---
6. Se o usu�rio disser para copiar a agenda de ontem para hoje, retorne uma a��o do tipo COPY_PASTE_AGENDA com 
       fromDay = ontem e toDay = hoje.

// --- Line 8720 ---
7. Se o usu�rio disser "marcar como feito as atividades da manh�", retorne complete_cards com timeRange = 
       "morning". A manh� corresponde a qualquer hor�rio de 06:00 a 11:30.

// --- Line 8721 ---
8. Mantenha os nomes de quadros e listas consistentes com os j� existentes, se houver similaridade sem�ntica 
       (ex: "pessoal" e "Pessoal").

// --- Line 8722 ---
9. Se o usu�rio pedir para deletar/excluir/apagar uma lista, use DELETE_LIST.

// --- Line 8723 ---
10. Se o usu�rio pedir para deletar/excluir/apagar um cart�o, use DELETE_CARD.

// --- Line 8724 ---
11. Se o usu�rio pedir para duplicar um cart�o, use DUPLICATE_CARD.

// --- Line 8725 ---
12. Se o usu�rio pedir para mover um cart�o para outra lista, quadrante, hor�rio ou outro quadro, use MOVE_CARD.

// --- Line 8726 ---
13. Se o usu�rio pedir para mover uma lista inteira para outro quadro, use MOVE_LIST.

// --- Line 8727 ---
14. Se o usu�rio pedir para mudar o tema, a cor ou o fundo do quadro para uma cor espec�fica, use CHANGE_THEME.

// --- Line 8728 ---
15. Se o usu�rio pedir para iniciar o timer/cron�metro de um cart�o, use START_TIMER.

// --- Line 8729 ---
16. Se o usu�rio pedir para pausar o timer/cron�metro de um cart�o, use PAUSE_TIMER.

// --- Line 8730 ---
17. Se o usu�rio pedir para abrir/fechar/esconder/mostrar a matriz, agenda, semana/vis�o semanal ou o 
       quadro/kanban, use TOGGLE_PANEL.

// --- Line 8731 ---
`;

// --- Line 8732 ---


// --- Line 8733 ---
const contents = [

// --- Line 8734 ---
{ role: 'user', parts: [{ text: sysPrompt + "\n\nAgora processe o seguinte di�logo com o 
       usu�rio:\n" }] }

// --- Line 8735 ---
];

// --- Line 8736 ---


// --- Line 8737 ---
aiConversationHistory.forEach(turn => {

// --- Line 8738 ---
contents.push(turn);

// --- Line 8739 ---
});

// --- Line 8740 ---


// --- Line 8741 ---
try {

// --- Line 8742 ---
const responseText = await callGemini(contents);

// --- Line 8743 ---


// --- Line 8744 ---
let responseJson;

// --- Line 8745 ---
try {

// --- Line 8746 ---
let cleanedText = responseText.trim();

// --- Line 8747 ---
if (cleanedText.startsWith('```')) {

// --- Line 8748 ---
cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/```$/, '').trim();

// --- Line 8749 ---
}

// --- Line 8750 ---
responseJson = JSON.parse(cleanedText);

// --- Line 8751 ---
} catch (parseErr) {

// --- Line 8752 ---
console.error("Gemini did not return valid JSON. Raw response: ", responseText);

// --- Line 8753 ---
showAiResponseBubble("Desculpe, n�o consegui entender o comando estruturado. Por favor 
       tente reescrever.", false, true);

// --- Line 8754 ---
aiConversationHistory.pop();

// --- Line 8755 ---
return;

// --- Line 8756 ---
}

// --- Line 8757 ---


// --- Line 8758 ---
aiConversationHistory.push({ role: 'model', parts: [{ text: JSON.stringify(responseJson) }] 
       });

// --- Line 8759 ---


// --- Line 8760 ---
if (responseJson.question) {

// --- Line 8761 ---
showAiResponseBubble(responseJson.question, true, false);

// --- Line 8762 ---
} else {

// --- Line 8763 ---
if (responseJson.actions && responseJson.actions.length > 0) {

// --- Line 8764 ---
executeAiActions(responseJson.actions);

// --- Line 8765 ---
}

// --- Line 8766 ---
showAiResponseBubble(responseJson.explanation || 'Comando executado com sucesso!', 
       false, false);

// --- Line 8767 ---
aiConversationHistory = [];

// --- Line 8768 ---
}

// --- Line 8769 ---
} catch (apiErr) {

// --- Line 8770 ---
console.error("Gemini API call failed: ", apiErr);

// --- Line 8771 ---
const errorMsg = apiErr.message || "Erro desconhecido. Verifique sua chave API e conex�o.";

// --- Line 8772 ---
showAiResponseBubble(`Erro da API: ${errorMsg}`, false, true);

// --- Line 8773 ---
aiConversationHistory.pop();

// --- Line 8774 ---
}

// --- Line 8775 ---
}

// --- Line 8776 ---


// --- Line 8777 ---
function executeAiActions(actions) {

// --- Line 8778 ---
actions.forEach(action => {

// --- Line 8779 ---
try {

// --- Line 8780 ---
switch (action.type) {

// --- Line 8781 ---
case 'SWITCH_BOARD':

// --- Line 8782 ---
if (action.boardName) {

// --- Line 8783 ---
const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.boardName.toLowerCase().trim());

// --- Line 8784 ---
if (board) {

// --- Line 8785 ---
switchBoard(board.id);

// --- Line 8786 ---
}

// --- Line 8787 ---
}

// --- Line 8788 ---
break;

// --- Line 8789 ---


// --- Line 8790 ---
case 'CREATE_LIST':

// --- Line 8791 ---
{

// --- Line 8792 ---
let boardId = currentBoardId;

// --- Line 8793 ---
if (action.boardName) {

// --- Line 8794 ---
const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.boardName.toLowerCase().trim());

// --- Line 8795 ---
if (board) {

// --- Line 8796 ---
boardId = board.id;

// --- Line 8797 ---
if (boardId !== currentBoardId) {

// --- Line 8798 ---
switchBoard(boardId);

// --- Line 8799 ---
}

// --- Line 8800 ---
}

// --- Line 8801 ---
}

// --- Line 8802 ---
let listEl = $$('.list[data-type="kanban"]', boardEl).find(l => 
       l.querySelector('.title').value.toLowerCase().trim() === action.listTitle.toLowerCase().trim());

// --- Line 8803 ---
if (!listEl) {

// --- Line 8804 ---
createList(action.listTitle);

// --- Line 8805 ---
persist();

// --- Line 8806 ---
}

// --- Line 8807 ---
}

// --- Line 8808 ---
break;

// --- Line 8809 ---


// --- Line 8810 ---
case 'CREATE_CARDS':

// --- Line 8811 ---
{

// --- Line 8812 ---
let boardId = currentBoardId;

// --- Line 8813 ---
if (action.boardName) {

// --- Line 8814 ---
const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.boardName.toLowerCase().trim());

// --- Line 8815 ---
if (board) {

// --- Line 8816 ---
boardId = board.id;

// --- Line 8817 ---
if (boardId !== currentBoardId) {

// --- Line 8818 ---
switchBoard(boardId);

// --- Line 8819 ---
}

// --- Line 8820 ---
}

// --- Line 8821 ---
}

// --- Line 8822 ---


// --- Line 8823 ---
let container = null;

// --- Line 8824 ---
let whenVal = "";

// --- Line 8825 ---


// --- Line 8826 ---
if (action.time) {

// --- Line 8827 ---
whenVal = getActiveDay() + 'T' + action.time;

// --- Line 8828 ---
const slot = 
       slotsRoot.querySelector(`.list.slot[data-time="${action.time}"]`);

// --- Line 8829 ---
if (slot) container = slot.querySelector('.cards');

// --- Line 8830 ---
} else if (action.goal) {

// --- Line 8831 ---
whenVal = getActiveDay() + 'TGOAL';

// --- Line 8832 ---
const goalSlot = slotsRoot.querySelector('.list.goal-slot');

// --- Line 8833 ---
if (goalSlot) container = goalSlot.querySelector('.cards');

// --- Line 8834 ---
} else if (action.quadrant) {

// --- Line 8835 ---
const quadList = 
       matrixEl.querySelector(`.list[data-quad="${action.quadrant}"]`);

// --- Line 8836 ---
if (quadList) container = quadList.querySelector('.cards');

// --- Line 8837 ---
} else {

// --- Line 8838 ---
let listTitle = action.listTitle || "Para Fazer";

// --- Line 8839 ---
let listEl = $$('.list[data-type="kanban"]', boardEl).find(l => 
       l.querySelector('.title').value.toLowerCase().trim() === listTitle.toLowerCase().trim());

// --- Line 8840 ---
if (!listEl) {

// --- Line 8841 ---
listEl = createList(listTitle);

// --- Line 8842 ---
}

// --- Line 8843 ---
container = listEl.querySelector('.cards');

// --- Line 8844 ---
}

// --- Line 8845 ---


// --- Line 8846 ---
if (container && action.cards) {

// --- Line 8847 ---
action.cards.forEach(cData => {

// --- Line 8848 ---
const cardData = {

// --- Line 8849 ---
text: cData.text,

// --- Line 8850 ---
color: cData.color || (action.quadrant ? 
       MATRIX_COLORS[action.quadrant] : ""),

// --- Line 8851 ---
due: cData.due || "",

// --- Line 8852 ---
when: whenVal,

// --- Line 8853 ---
timerTotal: cData.timerTotal ? String(cData.timerTotal) : ""

// --- Line 8854 ---
};

// --- Line 8855 ---
const newCard = createCard(cardData);

// --- Line 8856 ---
container.appendChild(newCard);

// --- Line 8857 ---
});

// --- Line 8858 ---
persist();

// --- Line 8859 ---
updateSlotsHasItems();

// --- Line 8860 ---
updateTotalTimerDisplay();

// --- Line 8861 ---
}

// --- Line 8862 ---
}

// --- Line 8863 ---
break;

// --- Line 8864 ---


// --- Line 8865 ---
case 'COMPLETE_CARDS':

// --- Line 8866 ---
{

// --- Line 8867 ---
let targetCards = [];

// --- Line 8868 ---
if (action.timeRange) {

// --- Line 8869 ---
allCards.forEach(c => {

// --- Line 8870 ---
if (c.dataset.when && /T\d{2}:\d{2}$/.test(c.dataset.when)) {

// --- Line 8871 ---
const timeStr = c.dataset.when.split('T')[1];

// --- Line 8872 ---
const hour = parseInt(timeStr.split(':')[0], 10);

// --- Line 8873 ---
let match = false;

// --- Line 8874 ---
if (action.timeRange === 'morning' && hour >= 6 && hour < 12) 
       match = true;

// --- Line 8875 ---
else if (action.timeRange === 'afternoon' && hour >= 12 && hour 
       < 18) match = true;

// --- Line 8876 ---
else if ((action.timeRange === 'evening' || action.timeRange 
       === 'night') && hour >= 18 && hour <= 23) match = true;

// --- Line 8877 ---
else if (action.timeRange === 'all') match = true;

// --- Line 8878 ---


// --- Line 8879 ---
if (match && c.dataset.completed !== 'true') {

// --- Line 8880 ---
targetCards.push(c);

// --- Line 8881 ---
}

// --- Line 8882 ---
}

// --- Line 8883 ---
});

// --- Line 8884 ---
} else if (action.time) {

// --- Line 8885 ---
const whenVal = getActiveDay() + 'T' + action.time;

// --- Line 8886 ---
allCards.forEach(c => {

// --- Line 8887 ---
if (c.dataset.when === whenVal && c.dataset.completed !== 'true') {

// --- Line 8888 ---
targetCards.push(c);

// --- Line 8889 ---
}

// --- Line 8890 ---
});

// --- Line 8891 ---
} else if (action.quadrant) {

// --- Line 8892 ---
const quadList = 
       matrixEl.querySelector(`.list[data-quad="${action.quadrant}"]`);

// --- Line 8893 ---
if (quadList) {

// --- Line 8894 ---
$$( '.card', quadList).forEach(c => {

// --- Line 8895 ---
const cardInCache = allCards.find(cacheCard => cacheCard === c);

// --- Line 8896 ---
if (cardInCache && cardInCache.dataset.completed !== 'true') {

// --- Line 8897 ---
targetCards.push(cardInCache);

// --- Line 8898 ---
}

// --- Line 8899 ---
});

// --- Line 8900 ---
}

// --- Line 8901 ---
} else if (action.listTitle) {

// --- Line 8902 ---
const listEl = $$('.list[data-type="kanban"]', boardEl).find(l => 
       l.querySelector('.title').value.toLowerCase().trim() === action.listTitle.toLowerCase().trim());

// --- Line 8903 ---
if (listEl) {

// --- Line 8904 ---
$$( '.card', listEl).forEach(c => {

// --- Line 8905 ---
const cardInCache = allCards.find(cacheCard => cacheCard === c);

// --- Line 8906 ---
if (cardInCache && cardInCache.dataset.completed !== 'true') {

// --- Line 8907 ---
targetCards.push(cardInCache);

// --- Line 8908 ---
}

// --- Line 8909 ---
});

// --- Line 8910 ---
}

// --- Line 8911 ---
} else if (action.all) {

// --- Line 8912 ---
allCards.forEach(c => {

// --- Line 8913 ---
if (c.dataset.completed !== 'true') {

// --- Line 8914 ---
targetCards.push(c);

// --- Line 8915 ---
}

// --- Line 8916 ---
});

// --- Line 8917 ---
}

// --- Line 8918 ---


// --- Line 8919 ---
if (targetCards.length > 0) {

// --- Line 8920 ---
targetCards.forEach(card => {

// --- Line 8921 ---
card.dataset.completed = 'true';

// --- Line 8922 ---
card.classList.remove('timer-finished');

// --- Line 8923 ---
if (card.dataset.timerState === 'finished') {

// --- Line 8924 ---
card.dataset.timerState = 'stopped';

// --- Line 8925 ---
}

// --- Line 8926 ---
updateTimerDisplay(card);

// --- Line 8927 ---
});

// --- Line 8928 ---
persist();

// --- Line 8929 ---
updateSlotsHasItems();

// --- Line 8930 ---
}

// --- Line 8931 ---
}

// --- Line 8932 ---
break;

// --- Line 8933 ---


// --- Line 8934 ---
case 'COPY_PASTE_AGENDA':

// --- Line 8935 ---
if (action.fromDay && action.toDay) {

// --- Line 8936 ---
copyAgendaFromTo(action.fromDay, action.toDay);

// --- Line 8937 ---
}

// --- Line 8938 ---
break;

// --- Line 8939 ---


// --- Line 8940 ---
case 'DELETE_LIST':

// --- Line 8941 ---
if (action.listTitle) {

// --- Line 8942 ---
const listEl = Array.from(document.querySelectorAll('.list')).find(l => {

// --- Line 8943 ---
const titleInput = l.querySelector('.title');

// --- Line 8944 ---
return titleInput && titleInput.value.toLowerCase().trim() === 
       action.listTitle.toLowerCase().trim();

// --- Line 8945 ---
});

// --- Line 8946 ---
if (listEl) {

// --- Line 8947 ---
listEl.remove();

// --- Line 8948 ---
persist();

// --- Line 8949 ---
}

// --- Line 8950 ---
}

// --- Line 8951 ---
break;

// --- Line 8952 ---


// --- Line 8953 ---
case 'DELETE_CARD':

// --- Line 8954 ---
if (action.cardText) {

// --- Line 8955 ---
const targetCard = allCards.find(c => {

// --- Line 8956 ---
const textEl = c.querySelector('.text');

// --- Line 8957 ---
return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

// --- Line 8958 ---
});

// --- Line 8959 ---
if (targetCard) {

// --- Line 8960 ---
removeCard(targetCard);

// --- Line 8961 ---
}

// --- Line 8962 ---
}

// --- Line 8963 ---
break;

// --- Line 8964 ---


// --- Line 8965 ---
case 'DUPLICATE_CARD':

// --- Line 8966 ---
if (action.cardText) {

// --- Line 8967 ---
const targetCard = allCards.find(c => {

// --- Line 8968 ---
const textEl = c.querySelector('.text');

// --- Line 8969 ---
return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

// --- Line 8970 ---
});

// --- Line 8971 ---
if (targetCard) {

// --- Line 8972 ---
duplicateCards([targetCard]);

// --- Line 8973 ---
}

// --- Line 8974 ---
}

// --- Line 8975 ---
break;

// --- Line 8976 ---


// --- Line 8977 ---
case 'MOVE_CARD':

// --- Line 8978 ---
if (action.cardText) {

// --- Line 8979 ---
const targetCard = allCards.find(c => {

// --- Line 8980 ---
const textEl = c.querySelector('.text');

// --- Line 8981 ---
return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

// --- Line 8982 ---
});

// --- Line 8983 ---
if (targetCard) {

// --- Line 8984 ---
if (action.targetBoardName) {

// --- Line 8985 ---
const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.targetBoardName.toLowerCase().trim());

// --- Line 8986 ---
if (board) {

// --- Line 8987 ---
moveCardToBoard(targetCard, board.id, action.targetListTitle || 
       'Inbox');

// --- Line 8988 ---
}

// --- Line 8989 ---
} else if (action.targetListTitle) {

// --- Line 8990 ---
const qUpper = action.targetListTitle.toUpperCase().trim();

// --- Line 8991 ---
if (['Q1', 'Q2', 'Q3', 'Q4'].includes(qUpper)) {

// --- Line 8992 ---
const quadList = 
       matrixEl.querySelector(`.list[data-quad="${qUpper}"]`);

// --- Line 8993 ---
if (quadList) {

// --- Line 8994 ---
quadList.querySelector('.cards').appendChild(targetCard);

// --- Line 8995 ---
targetCard.dataset.when = '';

// --- Line 8996 ---
targetCard.dataset.color = MATRIX_COLORS[qUpper];

// --- Line 8997 ---
paintCard(targetCard);

// --- Line 8998 ---
persist();

// --- Line 8999 ---
updateSlotsHasItems();

// --- Line 9000 ---
}

// --- Line 9001 ---
} else if (/^\d{2}:\d{2}$/.test(action.targetListTitle.trim())) {

// --- Line 9002 ---
const timeVal = action.targetListTitle.trim();

// --- Line 9003 ---
const slot = 
       slotsRoot.querySelector(`.list.slot[data-time="${timeVal}"]`);

// --- Line 9004 ---
if (slot) {

// --- Line 9005 ---
slot.querySelector('.cards').appendChild(targetCard);

// --- Line 9006 ---
targetCard.dataset.when = getActiveDay() + 'T' + timeVal;

// --- Line 9007 ---
paintCard(targetCard);

// --- Line 9008 ---
persist();

// --- Line 9009 ---
updateSlotsHasItems();

// --- Line 9010 ---
}

// --- Line 9011 ---
} else {

// --- Line 9012 ---
const listEl = $$('.list[data-type="kanban"]', boardEl).find(l 
       => {

// --- Line 9013 ---
const titleInput = l.querySelector('.title');

// --- Line 9014 ---
return titleInput && titleInput.value.toLowerCase().trim() 
       === action.targetListTitle.toLowerCase().trim();

// --- Line 9015 ---
});

// --- Line 9016 ---
if (listEl) {

// --- Line 9017 ---
listEl.querySelector('.cards').appendChild(targetCard);

// --- Line 9018 ---
targetCard.dataset.when = '';

// --- Line 9019 ---
paintCard(targetCard);

// --- Line 9020 ---
persist();

// --- Line 9021 ---
updateSlotsHasItems();

// --- Line 9022 ---
}

// --- Line 9023 ---
}

// --- Line 9024 ---
}

// --- Line 9025 ---
}

// --- Line 9026 ---
}

// --- Line 9027 ---
break;

// --- Line 9028 ---


// --- Line 9029 ---
case 'MOVE_LIST':

// --- Line 9030 ---
if (action.listTitle && action.targetBoardName) {

// --- Line 9031 ---
const listEl = Array.from(document.querySelectorAll('.list')).find(l => {

// --- Line 9032 ---
const titleInput = l.querySelector('.title');

// --- Line 9033 ---
return titleInput && titleInput.value.toLowerCase().trim() === 
       action.listTitle.toLowerCase().trim();

// --- Line 9034 ---
});

// --- Line 9035 ---
const board = boardsMeta.find(b => b.name.toLowerCase().trim() === 
       action.targetBoardName.toLowerCase().trim());

// --- Line 9036 ---
if (listEl && board) {

// --- Line 9037 ---
moveListToBoard(listEl, board.id);

// --- Line 9038 ---
}

// --- Line 9039 ---
}

// --- Line 9040 ---
break;

// --- Line 9041 ---


// --- Line 9042 ---
case 'CHANGE_THEME':

// --- Line 9043 ---
if (action.color) {

// --- Line 9044 ---
const board = boardsMeta.find(b => b.id === currentBoardId);

// --- Line 9045 ---
if (board) {

// --- Line 9046 ---
let selectedColor = null;

// --- Line 9047 ---
const inputColor = action.color.toLowerCase().trim();

// --- Line 9048 ---
if (THEMES[inputColor]) {

// --- Line 9049 ---
selectedColor = inputColor;

// --- Line 9050 ---
} else {

// --- Line 9051 ---
const foundTheme = Object.values(THEMES).find(t => 
       t.name.toLowerCase().includes(inputColor) || inputColor.includes(t.name.toLowerCase()));

// --- Line 9052 ---
if (foundTheme) {

// --- Line 9053 ---
selectedColor = foundTheme.brand;

// --- Line 9054 ---
} else {

// --- Line 9055 ---
const colorMap = {

// --- Line 9056 ---
'azul': '#1976d2',

// --- Line 9057 ---
'verde': '#2e7d32',

// --- Line 9058 ---
'roxo': '#7b1fa2',

// --- Line 9059 ---
'laranja': '#e65100',

// --- Line 9060 ---
'vermelho': '#c62828',

// --- Line 9061 ---
'cinza': '#37474f',

// --- Line 9062 ---
'ciano': '#00838f',

// --- Line 9063 ---
'rosa': '#ad1457',

// --- Line 9064 ---
'marrom': '#8d6e63',

// --- Line 9065 ---
'indigo': '#3f51b5',

// --- Line 9066 ---
'amarelo': '#ffb300',

// --- Line 9067 ---
'esmeralda': '#00c853',

// --- Line 9068 ---
'cyberpunk': '#ff007f',

// --- Line 9069 ---
'menta': '#00e676',

// --- Line 9070 ---
'oceano': '#00b0ff',

// --- Line 9071 ---
'rose': '#ec407a',

// --- Line 9072 ---
'grafite': '#607d8b'

// --- Line 9073 ---
};

// --- Line 9074 ---
for (const [key, val] of Object.entries(colorMap)) {

// --- Line 9075 ---
if (inputColor.includes(key)) {

// --- Line 9076 ---
selectedColor = val;

// --- Line 9077 ---
break;

// --- Line 9078 ---
}

// --- Line 9079 ---
}

// --- Line 9080 ---
}

// --- Line 9081 ---
}

// --- Line 9082 ---
if (selectedColor) {

// --- Line 9083 ---
board.color = selectedColor;

// --- Line 9084 ---
setBoardTheme(selectedColor);

// --- Line 9085 ---
saveBoardsMetadata();

// --- Line 9086 ---
}

// --- Line 9087 ---
}

// --- Line 9088 ---
}

// --- Line 9089 ---
break;

// --- Line 9090 ---


// --- Line 9091 ---
case 'START_TIMER':

// --- Line 9092 ---
if (action.cardText) {

// --- Line 9093 ---
const targetCard = allCards.find(c => {

// --- Line 9094 ---
const textEl = c.querySelector('.text');

// --- Line 9095 ---
return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

// --- Line 9096 ---
});

// --- Line 9097 ---
if (targetCard) {

// --- Line 9098 ---
var state = targetCard.dataset.timerState || 'stopped';

// --- Line 9099 ---
var total = parseInt(targetCard.dataset.timerTotal || '0', 10);

// --- Line 9100 ---
if (total === 0) {

// --- Line 9101 ---
total = 25 * 60;

// --- Line 9102 ---
targetCard.dataset.timerTotal = total;

// --- Line 9103 ---
targetCard.dataset.timerLeft = total;

// --- Line 9104 ---
}

// --- Line 9105 ---
targetCard.dataset.timerState = 'running';

// --- Line 9106 ---
var left = parseInt(targetCard.dataset.timerLeft, 10);

// --- Line 9107 ---
if (state === 'finished' || left <= 0) left = total;

// --- Line 9108 ---
targetCard.dataset.timerEnd = Date.now() + left * 1000;

// --- Line 9109 ---
targetCard.style.animation = '';

// --- Line 9110 ---
startGlobalTimer();

// --- Line 9111 ---
updateTimerDisplay(targetCard);

// --- Line 9112 ---
persist();

// --- Line 9113 ---
}

// --- Line 9114 ---
}

// --- Line 9115 ---
break;

// --- Line 9116 ---


// --- Line 9117 ---
case 'PAUSE_TIMER':

// --- Line 9118 ---
if (action.cardText) {

// --- Line 9119 ---
const targetCard = allCards.find(c => {

// --- Line 9120 ---
const textEl = c.querySelector('.text');

// --- Line 9121 ---
return textEl && 
       textEl.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());

// --- Line 9122 ---
});

// --- Line 9123 ---
if (targetCard) {

// --- Line 9124 ---
var state = targetCard.dataset.timerState || 'stopped';

// --- Line 9125 ---
if (state === 'running') {

// --- Line 9126 ---
targetCard.dataset.timerState = 'paused';

// --- Line 9127 ---
var now = Date.now();

// --- Line 9128 ---
var end = parseInt(targetCard.dataset.timerEnd, 10);

// --- Line 9129 ---
targetCard.dataset.timerLeft = Math.round((end - now) / 1000);

// --- Line 9130 ---
updateTimerDisplay(targetCard);

// --- Line 9131 ---
persist();

// --- Line 9132 ---
}

// --- Line 9133 ---
}

// --- Line 9134 ---
}

// --- Line 9135 ---
break;

// --- Line 9136 ---


// --- Line 9137 ---
case 'TOGGLE_PANEL':

// --- Line 9138 ---
if (action.panel) {

// --- Line 9139 ---
const panelLower = action.panel.toLowerCase().trim();

// --- Line 9140 ---
if (panelLower === 'kanban' || panelLower === 'quadro') {

// --- Line 9141 ---
document.getElementById('toggleBoardBtn').click();

// --- Line 9142 ---
} else if (panelLower === 'matrix' || panelLower === 'matriz') {

// --- Line 9143 ---
document.getElementById('toggleMatrixBtn').click();

// --- Line 9144 ---
} else if (panelLower === 'agenda') {

// --- Line 9145 ---
document.getElementById('toggleAgendaBtn').click();

// --- Line 9146 ---
} else if (panelLower === 'weekly' || panelLower === 'semana' || panelLower 
       === 'semanal') {

// --- Line 9147 ---
document.getElementById('toggleWeeklyBtn').click();

// --- Line 9148 ---
}

// --- Line 9149 ---
}

// --- Line 9150 ---
break;

// --- Line 9151 ---
}

// --- Line 9152 ---
} catch (err) {

// --- Line 9153 ---
console.error("Erro executando a��o da IA:", action, err);

// --- Line 9154 ---
}

// --- Line 9155 ---
});

// --- Line 9156 ---
}

// --- Line 9157 ---


// --- Line 9158 ---
function copyAgendaFromTo(fromDay, toDay) {

// --- Line 9159 ---
if (fromDay === toDay) return;

// --- Line 9160 ---
const cardsToCopy = allCards.filter(c => (c.dataset.when || '').startsWith(fromDay + 
       'T')).map(c => ({

// --- Line 9161 ---
...cardToData(c),

// --- Line 9162 ---
timeOrGoal: (c.dataset.when || '').substring(11)

// --- Line 9163 ---
}));

// --- Line 9164 ---
cardsToCopy.forEach(cardData => {

// --- Line 9165 ---
const newData = { ...cardData };

// --- Line 9166 ---
newData.when = toDay + 'T' + newData.timeOrGoal;

// --- Line 9167 ---
const existsInCache = allCards.some(c => c.dataset.when === newData.when && 
       c.querySelector('.text').textContent.trim() === newData.text.trim());

// --- Line 9168 ---
if (!existsInCache) {

// --- Line 9169 ---
createCard(newData);

// --- Line 9170 ---
}

// --- Line 9171 ---
});

// --- Line 9172 ---
updateSlotsHasItems();

// --- Line 9173 ---
persist();

// --- Line 9174 ---
}

// --- Line 9175 ---


// --- Line 9176 ---
function initAiControls() {

// --- Line 9177 ---
const sendBtn = document.getElementById('aiSendBtn');

// --- Line 9178 ---
if (sendBtn) sendBtn.addEventListener('click', submitAiCommand);

// --- Line 9179 ---


// --- Line 9180 ---
const inputEl = document.getElementById('aiInput');

// --- Line 9181 ---
if (inputEl) {

// --- Line 9182 ---
inputEl.addEventListener('keydown', function(e) {

// --- Line 9183 ---
if (e.key === 'Enter') {

// --- Line 9184 ---
e.preventDefault();

// --- Line 9185 ---
submitAiCommand();

// --- Line 9186 ---
}

// --- Line 9187 ---
});

// --- Line 9188 ---
}

// --- Line 9189 ---


// --- Line 9190 ---
const configBtn = document.getElementById('aiConfigBtn');

// --- Line 9191 ---
if (configBtn) configBtn.addEventListener('click', configureApiKeyDialog);

// --- Line 9192 ---


// --- Line 9193 ---
const micBtn = document.getElementById('aiMicBtn');

// --- Line 9194 ---
if (micBtn) micBtn.addEventListener('click', toggleVoiceRecord);

// --- Line 9195 ---


// --- Line 9196 ---
initSpeechRecognition();

// --- Line 9197 ---
}

// --- Line 9198 ---


// --- Line 9199 ---
function initApp() {

// --- Line 9200 ---
// Auto-generated backup fallback



